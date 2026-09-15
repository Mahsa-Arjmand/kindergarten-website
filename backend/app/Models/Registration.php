<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Registration extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'registration_id',
        'child_first_name',
        'child_last_name',
        'child_birth_date',
        'child_gender',
        'age_group',
        'child_notes',
        'parent_first_name',
        'parent_last_name',
        'parent_relation',
        'phone',
        'phone_secondary',
        'email',
        'preferred_program',
        'preferred_time',
        'notes',
        'status',
    ];

    protected $casts = [
        'child_birth_date' => 'date',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->registration_id)) {
                $model->registration_id = 'REG-' . strtoupper(uniqid());
            }
        });
    }
}

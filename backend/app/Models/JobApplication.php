<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobApplication extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'age',
        'education',
        'field_of_study',
        'work_experience',
        'skills',
        'notes',
        'cv_path',
        'status',
    ];

    protected $casts = [
        'age' => 'integer',
    ];
}

@echo off
cd /d "%~dp0"
php -d upload_max_filesize=250M -d post_max_size=260M -d max_execution_time=300 -d max_input_time=300 artisan serve --host=127.0.0.1 --port=8000

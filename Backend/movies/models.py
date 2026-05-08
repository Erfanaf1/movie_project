from django.db import models

class Movie(models.Model):
    """مدل فیلم‌ها"""
    # فیلدهای اصلی از API
    api_id = models.IntegerField(unique=True, null=True, blank=True)
    title = models.CharField(max_length=200)
    poster = models.URLField(max_length=500, blank=True, null=True)
    year = models.CharField(max_length=10, blank=True, null=True)
    rated = models.CharField(max_length=20, blank=True, null=True)
    released = models.CharField(max_length=50, blank=True, null=True)
    runtime = models.CharField(max_length=20, blank=True, null=True)
    director = models.CharField(max_length=200, blank=True, null=True)
    writer = models.TextField(blank=True, null=True)
    actors = models.TextField(blank=True, null=True)
    plot = models.TextField(blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    awards = models.TextField(blank=True, null=True)
    metascore = models.CharField(max_length=10, blank=True, null=True)
    imdb_rating = models.CharField(max_length=10, blank=True, null=True)
    imdb_votes = models.CharField(max_length=20, blank=True, null=True)
    imdb_id = models.CharField(max_length=20, blank=True, null=True)
    movie_type = models.CharField(max_length=20, blank=True, null=True)  # type
    genres = models.CharField(max_length=200, blank=True, null=True)
    
    # فیلدهای اختصاصی برای مدیریت کاربر
    status = models.CharField(
        max_length=20, 
        default='want-to-watch',
        choices=[('watched', 'تماشا شده'), ('want-to-watch', 'میخواهم ببینم')]
    )
    user_rating = models.IntegerField(null=True, blank=True)
    user_note = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title


class Genre(models.Model):
    """مدل ژانرها"""
    api_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name


class UserToken(models.Model):
    """ذخیره توکن کاربر (برای ارتباط با API خارجی)"""
    user_id = models.IntegerField()  # ID کاربر در API خارجی
    name = models.CharField(max_length=200)
    email = models.EmailField()
    access_token = models.TextField()
    refresh_token = models.TextField()
    expires_in = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
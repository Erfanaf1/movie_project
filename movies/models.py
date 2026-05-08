from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=200)
    director = models.CharField(max_length=100)
    year = models.IntegerField()
    genre = models.CharField(max_length=50)
    status = models.CharField(max_length=20)
    rating = models.IntegerField(null=True, blank=True)
    
    def __str__(self):
        return self.title
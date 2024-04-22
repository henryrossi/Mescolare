# Generated by Django 5.0 on 2024-02-06 18:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0010_alter_tfidf_score'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipe',
            name='picture',
        ),
        migrations.AddField(
            model_name='recipe',
            name='imageURL',
            field=models.CharField(max_length=250, null=True, unique=True),
        ),
    ]
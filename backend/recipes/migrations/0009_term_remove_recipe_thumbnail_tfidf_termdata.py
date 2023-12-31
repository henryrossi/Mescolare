# Generated by Django 4.2.2 on 2023-08-06 01:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0008_recipe_thumbnail_alter_recipe_picture'),
    ]

    operations = [
        migrations.CreateModel(
            name='Term',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('term', models.CharField(max_length=25, unique=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='recipe',
            name='thumbnail',
        ),
        migrations.CreateModel(
            name='TFIDF',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField()),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='recipes.recipe')),
                ('term', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='recipes.term')),
            ],
        ),
        migrations.CreateModel(
            name='TermData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('frequency', models.IntegerField()),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='recipes.recipe')),
                ('term', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='recipes.term')),
            ],
        ),
    ]

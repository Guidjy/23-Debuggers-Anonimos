# Generated by Django 5.2.3 on 2025-06-14 05:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gerencia', '0003_alter_tarefaeap_descricao'),
    ]

    operations = [
        migrations.AddField(
            model_name='estruturaanaliticaprojeto',
            name='documento',
            field=models.FileField(blank=True, null=True, upload_to='documentos/'),
        ),
    ]

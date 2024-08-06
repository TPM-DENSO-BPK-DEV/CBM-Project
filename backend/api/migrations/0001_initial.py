# api/migrations/0001_initial.py

from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CBMRawData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField()),
                ('node_id', models.CharField(max_length=50)),
                ('peak_temp', models.FloatField()),
                ('avg_temp', models.FloatField()),
                ('peak_current', models.FloatField()),
                ('avg_current', models.FloatField()),
                ('mc_no', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'cbm_raw_data',
                'managed': False,
            },
        ),
    ]

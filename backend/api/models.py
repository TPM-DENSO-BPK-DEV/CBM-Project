from django.db import models

class CBMRawData(models.Model):
    timestamp = models.DateTimeField()
    node_id = models.CharField(max_length=50)
    peak_temp = models.FloatField()
    avg_temp = models.FloatField()
    peak_current = models.FloatField()
    avg_current = models.FloatField()
    mc_no = models.CharField(max_length=50)
    section_code = models.CharField(max_length=255)
    mc_name = models.TextField()

    class Meta:
        db_table = 'cbm_raw_data'
        managed = False

    def __str__(self):
        return f"{self.node_id} - {self.timestamp}"

class CBMNonZero(models.Model):
    timestamp = models.DateTimeField()
    node_id = models.CharField(max_length=50)
    peak_temp = models.FloatField()
    avg_temp = models.FloatField()
    peak_current = models.FloatField()
    avg_current = models.FloatField()
    mc_no = models.CharField(max_length=50)
    section_code = models.CharField(max_length=255)
    mc_name = models.TextField()

    class Meta:
        db_table = 'cbm_non_zero'  # Replace with your actual table name
        managed = False

    def __str__(self):
        return f"{self.node_id} - {self.timestamp}"

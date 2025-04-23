<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer app permanent color="#504B38">
      <v-list dense>
        <v-list-item class="pa-4">
          <v-list-item-title class="text-h6">VermiTech</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link>
          <v-list-item-content class="d-flex align-center">
            <v-icon class="mr-2">mdi-view-dashboard</v-icon>
            <v-list-item-title>Overview</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content class="d-flex align-center">
            <v-icon class="mr-2">mdi-chart-box-outline</v-icon>
            <v-list-item-title>Sensor Monitor</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content class="d-flex align-center">
            <v-icon class="mr-2">mdi-database</v-icon>
            <v-list-item-title>Data Logging</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content class="d-flex align-center">
            <v-icon class="mr-2">mdi-cog-outline</v-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-spacer></v-spacer>
        <v-list-item link class="mt-4">
          <v-list-item-content class="d-flex align-center">
            <v-icon color="red" class="mr-2">mdi-logout</v-icon>
            <v-list-item-title class="red--text">Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar app color="#C1BAA1" dark>
      <v-toolbar-title>VermiTech: Monitoring Vermicast Production</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon class="mr-2">mdi-clock-time-four-outline</v-icon>
      <span>{{ currentTime }}</span>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container class="pa-4" style="background-color: #D7D3BF; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        
        <!-- Sensor Cards Row -->
        <v-row>
          <v-col cols="12" md="3" v-for="(sensor, key) in sensors" :key="key">
            <v-card class="sensor-card" outlined hover ripple>
              <v-card-title>
                <v-icon class="mr-2" :color="sensor.color">{{ sensor.icon }}</v-icon>
                {{ sensor.label }}
              </v-card-title>
              <v-card-text>
                {{ sensor.value }} {{ sensor.unit }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Serial Monitor -->
        <v-row>
          <v-col cols="12">
            <v-card class="pa-4 serial-monitor-card" outlined>
              <v-card-title>
                <v-icon class="mr-2" color="blue">mdi-console</v-icon>
                Serial Monitor
              </v-card-title>
              <v-card-text>
                <div class="serial-log-container">
                  <div v-for="(line, index) in serialLogs" :key="index" class="serial-log-line">
                    {{ line }}
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Harvest Schedule -->
        <v-row class="mt-4">
          <v-col cols="12" md="6">
            <v-card class="pa-4" outlined>
              <v-card-title>
                <v-icon class="mr-2" color="green">mdi-calendar-clock</v-icon>
                Harvest Schedule
              </v-card-title>
              <v-card-text>
                Next Harvest: <strong>{{ nextHarvestDate }}</strong>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      currentTime: '',
      nextHarvestDate: 'May 10, 2025',
      sensors: {
        temperature: { label: "Temperature", icon: "mdi-thermometer", value: 27, unit: "°C", color: "orange" },
        humidity: { label: "Humidity", icon: "mdi-water-percent", value: 65, unit: "%", color: "blue" },
        moisture: { label: "Moisture", icon: "mdi-water", value: 40, unit: "%", color: "teal" },
        gas: { label: "Gas", icon: "mdi-molecule", value: 300, unit: "ppm", color: "green" },
        ph: { label: "pH Level", icon: "mdi-test-tube", value: 6.8, unit: "", color: "purple" },
      },
      serialLogs: [
        'Temp: 27 °C, Humidity: 65 %, Moisture: 40 %, Gas: 300 ppm, pH: 6.8',
        'Temp: 28 °C, Humidity: 64 %, Moisture: 42 %, Gas: 310 ppm, pH: 6.7',
        'Temp: 29 °C, Humidity: 63 %, Moisture: 45 %, Gas: 320 ppm, pH: 6.6',
        'Temp: 30 °C, Humidity: 62 %, Moisture: 50 %, Gas: 330 ppm, pH: 6.5',
      ],
    };
  },
  methods: {
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleString();
    }
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  }
};
</script>

<style>
.v-application {
  background-color: #ECEBDE;
}
.sensor-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border-radius: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.sensor-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
.v-navigation-drawer {
  background-color: #504B38 !important;
}
.v-list-item:hover {
  background-color: #C1BAA1 !important;
  color: #ffffff;
}
.v-app-bar {
  background-color: #C1BAA1 !important;
}
.serial-monitor-card {
  background-color: #ffffff;
  border-radius: 10px;
}
.serial-log-container {
  max-height: 300px;
  overflow-y: auto;
  background-color: #fff;
  padding: 16px;
  border: 2px solid #C1BAA1;
  border-radius: 12px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
}
.serial-log-line {
  color: #504B38;
  font-family: 'Courier New', Courier, monospace;
  margin-bottom: 6px;
  font-size: 14px;
  line-height: 1.4;
}
</style>

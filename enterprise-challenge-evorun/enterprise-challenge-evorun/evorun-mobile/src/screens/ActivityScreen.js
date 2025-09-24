import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ActivityScreen({ navigation }) {
  const activities = [
    {
      id: 1,
      title: 'Corrida noturna',
      date: '20 Jan 2023',
      time: '1:10:12',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      map: 'https://via.placeholder.com/64x64/333333/ffffff?text=Map1',
    },
    {
      id: 2,
      title: 'Treino Semanal',
      date: '20 Jan 2023',
      time: '1:10:12',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      map: 'https://via.placeholder.com/64x64/333333/ffffff?text=Map2',
    },
  ];

  return (
    <ImageBackground 
      source={require('../../assets/banner.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.bannerContainer}>
          <ImageBackground
            source={{ uri: 'https://via.placeholder.com/400x200/1a1a1a/ffffff?text=Activity+Banner' }}
            style={styles.banner}
            imageStyle={styles.bannerImage}
          >
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back-circle" size={24} color="white" />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.activityTitle}>Corrida matinal</Text>
          <Text style={styles.mainDistance}>9.21 km</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Data</Text>
              <Text style={styles.statValue}>12 Jan 2023</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Hora</Text>
              <Text style={styles.statValue}>1:50:31</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Passos</Text>
              <Text style={styles.statValue}>15.041</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Calorias</Text>
              <Text style={styles.statValue}>600 kcal</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Últimas atividades</Text>
            <TouchableOpacity>
              <Text style={styles.seeMore}>Ver mais</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.activitiesList}>
            {activities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <Image source={{ uri: activity.map }} style={styles.activityMap} />
                <View style={styles.activityInfo}>
                  <Text style={styles.activityName}>{activity.title}</Text>
                  <View style={styles.activityMeta}>
                    <Ionicons name="calendar-outline" size={12} color="#bbb" />
                    <Text style={styles.metaText}>{activity.date}</Text>
                    <Ionicons name="time-outline" size={12} color="#bbb" style={styles.metaIcon} />
                    <Text style={styles.metaText}>{activity.time}</Text>
                  </View>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.runButton}
            onPress={() => navigation.navigate('Execution')}
          >
            <Text style={styles.runButtonText}>Correr</Text>
            <Ionicons name="flash" size={16} color="white" style={styles.runButtonIcon} />
          </TouchableOpacity>
        </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  bannerContainer: {
    position: 'relative',
  },
  banner: {
    height: 200,
    justifyContent: 'flex-start',
  },
  bannerImage: {
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  summaryContainer: {
    padding: 20,
    alignItems: 'center',
  },
  activityTitle: {
    color: '#bbb',
    fontSize: 16,
    marginBottom: 4,
  },
  mainDistance: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    gap: 16,
  },
  statItem: {
    width: '45%',
    alignItems: 'center',
  },
  statLabel: {
    color: '#999',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  seeMore: {
    color: '#00bfff',
    fontSize: 12,
  },
  activitiesList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: '#121212',
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  activityMap: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaText: {
    color: '#bbb',
    fontSize: 12,
    marginLeft: 4,
  },
  metaIcon: {
    marginLeft: 8,
  },
  activityDescription: {
    color: '#999',
    fontSize: 11,
    lineHeight: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
  },
  runButton: {
    backgroundColor: '#165a96',
    borderRadius: 25,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  runButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  runButtonIcon: {
    marginLeft: 6,
  },
});
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getMissions } from '../services/mockData';

export default function MissionScreen({ navigation }) {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMissions();
  }, []);

  const loadMissions = async () => {
    try {
      const missionsData = await getMissions();
      setMissions(missionsData);
    } catch (error) {
      console.error('Error loading missions:', error);
    } finally {
      setLoading(false);
    }
  };


  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Iniciante':
        return '#00bfff';
      case 'Intermediário':
        return '#f39c12';
      case 'Avançado':
        return '#e74c3c';
      default:
        return '#00bfff';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'Iniciante':
        return '❄️';
      case 'Intermediário':
        return '🔥';
      case 'Avançado':
        return '⚡';
      default:
        return '❄️';
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/Image-bg-missão.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.overlay}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#00bfff" />
              <Text style={styles.loadingText}>Carregando missões...</Text>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
            
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Missões Disponíveis</Text>
              <Text style={styles.headerSubtitle}>Escolha sua próxima aventura</Text>
            </View>

        <View style={styles.missionsList}>
          {missions.map((mission) => (
            <TouchableOpacity
              key={mission.id}
              style={styles.missionCard}
              onPress={() => navigation.navigate('MissionDetail', { mission })}
            >
              <Image 
                source={require('../../assets/Cover.png')} 
                style={styles.missionBanner}
                resizeMode="cover"
              />
              
              <View style={styles.missionContent}>
                <View style={styles.missionHeader}>
                  <Text style={styles.missionTitle}>{mission.title}</Text>
                  <View style={styles.missionInfo}>
                    <View style={styles.pointsContainer}>
                      <Ionicons name="diamond" size={14} color="#00bfff" />
                      <Text style={styles.points}>{mission.points}</Text>
                    </View>
                    <View style={[
                      styles.difficultyBadge,
                      { backgroundColor: getDifficultyColor(mission.difficulty) }
                    ]}>
                      <Text style={styles.difficultyIcon}>{getDifficultyIcon(mission.difficulty)}</Text>
                      <Text style={styles.difficultyText}>{mission.difficulty}</Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.missionDescription} numberOfLines={3}>
                  {mission.description}
                </Text>

                <View style={styles.missionFooter}>
                  <View style={styles.creatorInfo}>
                    <Image source={{ uri: mission.creator.avatar }} style={styles.creatorAvatar} />
                    <View>
                      <Text style={styles.creatorLabel}>Criador</Text>
                      <Text style={styles.creatorName}>{mission.creator.name}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.distanceContainer}>
                    <Ionicons name="location" size={16} color="#00bfff" />
                    <Text style={styles.distance}>{mission.distance}</Text>
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.startButton}
                  onPress={() => navigation.navigate('MissionDetail', { mission })}
                >
                  <Text style={styles.startButtonText}>Ver Detalhes</Text>
                  <Ionicons name="arrow-forward" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
            </View>
          </ScrollView>
          )}
        </View>
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
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#bbb',
    fontSize: 14,
  },
  missionsList: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    gap: 20,
  },
  missionCard: {
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  missionBanner: {
    width: '100%',
    height: 150,
  },
  missionContent: {
    padding: 16,
  },
  missionHeader: {
    marginBottom: 12,
  },
  missionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  missionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  points: {
    color: '#00bfff',
    fontSize: 14,
    fontWeight: '600',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  difficultyIcon: {
    fontSize: 12,
  },
  difficultyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: '#888',
    fontSize: 16,
    marginTop: 12,
  },
  missionDescription: {
    color: '#ddd',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  missionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  creatorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  creatorLabel: {
    color: '#888',
    fontSize: 12,
  },
  creatorName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distance: {
    color: '#00bfff',
    fontSize: 14,
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: '#165a96',
    borderRadius: 25,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
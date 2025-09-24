import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockUser, getWeeklyChallenge, getMissions } from '../services/mockData';

export default function HomeScreen({ navigation }) {
  const [user] = useState(mockUser);
  const [weeklyChallenge, setWeeklyChallenge] = useState(null);
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const weekDays = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  const activeDay = 0;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [challengeData, missionsData] = await Promise.all([
        getWeeklyChallenge(),
        getMissions()
      ]);
      
      setWeeklyChallenge(challengeData);
      setMissions(missionsData.slice(0, 2)); // Show only first 2 missions
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/Home Background.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.overlay}>
            {/* Header */}
            <View style={styles.header}>
              <Image 
                source={require('../../assets/Profile.png')} 
                style={styles.profileImage}
                resizeMode="cover"
              />
              <View style={styles.userInfo}>
                <Text style={styles.greeting}>
                  Olá, <Text style={styles.userName}>{user.name}</Text>.
                </Text>
              </View>
            </View>

        <View style={styles.bannerContainer}>
          <ImageBackground
            source={{ uri: 'https://via.placeholder.com/350x200/1a1a1a/ffffff?text=Welcome+Banner' }}
            style={styles.banner}
            imageStyle={styles.bannerImage}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>
                Seja bem-vindo à <Text style={styles.brandHighlight}>Evorun</Text>
              </Text>
              <Text style={styles.bannerSubtitle}>Comece uma missão hoje!</Text>
              <TouchableOpacity style={styles.playButton}>
                <Ionicons name="play-circle" size={24} color="#00bfff" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Escolha uma missão</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Missions')}>
              <Text style={styles.seeMore}>Ver mais</Text>
            </TouchableOpacity>
          </View>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#00bfff" />
            </View>
          ) : (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.missionsList}
            >
              {missions.map((mission) => (
                <TouchableOpacity 
                  key={mission.id} 
                  style={styles.missionCard}
                  onPress={() => navigation.navigate('MissionDetail', { mission })}
                >
                  <Image source={{ uri: mission.badge || 'https://via.placeholder.com/32x32/00bfff/ffffff?text=🏃' }} style={styles.missionBadge} />
                  <Text style={styles.missionTitle}>{mission.title}</Text>
                  <Text style={styles.missionSubtitle}>{mission.description || mission.subtitle}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Desafio semanal</Text>
            <TouchableOpacity>
              <Text style={styles.seeMore}>Ver mais</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.weekContainer}>
            {weekDays.map((day, index) => (
              <View 
                key={index} 
                style={[
                  styles.dayCircle, 
                  index === activeDay && styles.activeDayCircle
                ]}
              >
                <Text style={[
                  styles.dayText,
                  index === activeDay && styles.activeDayText
                ]}>
                  {day}
                </Text>
              </View>
            ))}
          </View>
        </View>
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
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    color: 'white',
    fontSize: 14,
  },
  userName: {
    color: '#00bfff',
    fontWeight: '600',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  bannerContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  banner: {
    height: 200,
    justifyContent: 'flex-end',
  },
  bannerImage: {
    borderRadius: 12,
  },
  bannerContent: {
    padding: 20,
  },
  bannerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  brandHighlight: {
    color: '#00bfff',
  },
  bannerSubtitle: {
    color: 'white',
    fontSize: 13,
    marginBottom: 8,
  },
  playButton: {
    alignSelf: 'flex-start',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
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
    fontSize: 13,
  },
  missionsList: {
    paddingBottom: 10,
  },
  missionCard: {
    backgroundColor: '#121212',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 140,
    alignItems: 'center',
  },
  missionBadge: {
    width: 32,
    height: 32,
    marginBottom: 10,
  },
  missionTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
  },
  missionSubtitle: {
    color: '#ddd',
    fontSize: 11,
    textAlign: 'center',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDayCircle: {
    backgroundColor: '#00bfff',
  },
  dayText: {
    color: '#888',
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeDayText: {
    color: 'black',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
});
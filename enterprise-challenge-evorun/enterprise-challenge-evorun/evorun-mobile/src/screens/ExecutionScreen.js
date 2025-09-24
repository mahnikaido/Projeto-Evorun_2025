import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExecutionScreen({ navigation, route }) {
  const { mission } = route.params || {
    mission: {
      title: 'Missão Inicial',
      distance: '3km',
      points: '23k',
    }
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime] = useState(180); // 3 minutes for demo
  const [isRunning, setIsRunning] = useState(false);
  const [runningStats, setRunningStats] = useState({
    distance: 0,
    pace: '0:00',
    calories: 0,
    time: '00:00:00',
  });

  // Timer for running simulation
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setRunningStats(prev => ({
          ...prev,
          distance: prev.distance + 0.01, // Simulate distance increase
          calories: prev.calories + 0.1,
          time: formatTime(Date.now() - startTime),
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Audio timer simulation
  useEffect(() => {
    let interval;
    if (isPlaying && currentTime < totalTime) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, totalTime]);

  const [startTime] = useState(Date.now());

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const formatAudioTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleRunning = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPlaying(true); // Auto-start audio when starting run
    } else {
      Alert.alert(
        'Pausar Corrida',
        'Deseja pausar a corrida atual?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Pausar', onPress: () => setIsRunning(false) },
        ]
      );
    }
  };

  const finishMission = () => {
    Alert.alert(
      'Missão Concluída!',
      `Parabéns! Você completou a missão "${mission.title}".\n\nEstatísticas:\n• Distância: ${runningStats.distance.toFixed(2)}km\n• Tempo: ${runningStats.time}\n• Calorias: ${Math.floor(runningStats.calories)}\n• Pontos ganhos: ${mission.points}`,
      [
        { text: 'Continuar', onPress: () => navigation.navigate('Home') },
      ]
    );
  };

  const progress = currentTime / totalTime;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/Mapa-1.png')}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.missionTitle}>{mission.title}</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="ellipsis-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Running Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.mainStat}>
            <Text style={styles.mainStatValue}>{runningStats.distance.toFixed(2)}</Text>
            <Text style={styles.mainStatLabel}>km percorridos</Text>
          </View>
          
          <View style={styles.secondaryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{runningStats.time}</Text>
              <Text style={styles.statLabel}>Tempo</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{runningStats.pace}</Text>
              <Text style={styles.statLabel}>Ritmo</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{Math.floor(runningStats.calories)}</Text>
              <Text style={styles.statLabel}>Calorias</Text>
            </View>
          </View>
        </View>

        {/* Audio Player */}
        <View style={styles.audioPlayer}>
          <View style={styles.audioHeader}>
            <Ionicons name="headset" size={20} color="#00bfff" />
            <Text style={styles.audioTitle}>Narrativa da Missão</Text>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatAudioTime(currentTime)}</Text>
              <Text style={styles.timeText}>{formatAudioTime(totalTime)}</Text>
            </View>
          </View>

          <View style={styles.audioControls}>
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="play-skip-back" size={24} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.playButton}
              onPress={togglePlayPause}
            >
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={32} 
                color="white" 
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="play-skip-forward" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[
              styles.runButton,
              isRunning ? styles.runButtonActive : styles.runButtonInactive
            ]}
            onPress={toggleRunning}
          >
            <Ionicons 
              name={isRunning ? "pause" : "play"} 
              size={24} 
              color="white" 
            />
            <Text style={styles.runButtonText}>
              {isRunning ? 'Pausar Corrida' : 'Iniciar Corrida'}
            </Text>
          </TouchableOpacity>

          {runningStats.distance >= 2.5 && (
            <TouchableOpacity 
              style={styles.finishButton}
              onPress={finishMission}
            >
              <Ionicons name="checkmark-circle" size={24} color="white" />
              <Text style={styles.finishButtonText}>Finalizar Missão</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Bottom Navigation Placeholder */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Image 
              source={require('../../assets/maps.png')} 
              style={styles.navIcon}
              resizeMode="contain"
            />
            <Text style={styles.navLabel}>Mapa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="analytics" size={24} color="#666" />
            <Text style={styles.navLabel}>Métricas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Image 
              source={require('../../assets/footprints.png')} 
              style={styles.navIcon}
              resizeMode="contain"
            />
            <Text style={styles.navLabel}>Pegadas</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  missionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  menuButton: {
    padding: 8,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  mainStat: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mainStatValue: {
    color: 'white',
    fontSize: 48,
    fontWeight: '700',
  },
  mainStatLabel: {
    color: '#888',
    fontSize: 16,
    marginTop: 4,
  },
  secondaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(18, 18, 18, 0.8)',
    borderRadius: 16,
    padding: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  audioPlayer: {
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
  },
  audioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  audioTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00bfff',
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#888',
    fontSize: 12,
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  controlButton: {
    padding: 8,
  },
  playButton: {
    backgroundColor: '#00bfff',
    borderRadius: 32,
    padding: 16,
  },
  actionButtons: {
    paddingHorizontal: 20,
    gap: 12,
  },
  runButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 25,
    gap: 8,
  },
  runButtonActive: {
    backgroundColor: '#e74c3c',
  },
  runButtonInactive: {
    backgroundColor: '#27ae60',
  },
  runButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  finishButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f39c12',
    paddingVertical: 16,
    borderRadius: 25,
    gap: 8,
  },
  finishButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
    paddingVertical: 16,
    marginTop: 'auto',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    color: '#666',
    fontSize: 12,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
});
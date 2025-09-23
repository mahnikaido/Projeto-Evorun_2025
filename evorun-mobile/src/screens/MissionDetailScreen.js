import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MissionDetailScreen({ navigation, route }) {
  const { mission } = route.params || {
    mission: {
      id: 1,
      title: 'Missão Inicial',
      description: 'Você acaba de ser convocado para sua primeira missão como Guardião da Chama Interior. O objetivo é simples, mas simbólico: correr por 3km até alcançar o antigo marco de Evorun. Essa trilha revela não apenas o terreno, mas a força interior de quem a percorrer. É o início da sua jornada, o primeiro passo em direção à sua própria lenda.',
      distance: '3km',
      difficulty: 'Iniciante',
      points: '23k',
      creator: {
        name: 'Empress Poison',
        avatar: 'https://via.placeholder.com/40x40/ff6b6b/ffffff?text=EP',
      },
      banner: 'https://via.placeholder.com/400x300/1a1a1a/ffffff?text=Mission+Detail+Banner',
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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Banner */}
        <View style={styles.bannerContainer}>
          <ImageBackground
            source={{ uri: mission.banner }}
            style={styles.banner}
            imageStyle={styles.bannerImage}
          >
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back-circle" size={28} color="white" />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        {/* Mission Content */}
        <View style={styles.content}>
          {/* Mission Title and Info */}
          <View style={styles.titleSection}>
            <Text style={styles.missionTitle}>{mission.title}</Text>
            <View style={styles.missionMeta}>
              <View style={styles.pointsContainer}>
                <Ionicons name="diamond" size={16} color="#00bfff" />
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

          {/* Mission Description */}
          <Text style={styles.description}>{mission.description}</Text>

          {/* Mission Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="location" size={20} color="#00bfff" />
              <Text style={styles.statLabel}>Distância</Text>
              <Text style={styles.statValue}>{mission.distance}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="time" size={20} color="#00bfff" />
              <Text style={styles.statLabel}>Tempo Est.</Text>
              <Text style={styles.statValue}>30-45 min</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="flame" size={20} color="#00bfff" />
              <Text style={styles.statLabel}>Calorias</Text>
              <Text style={styles.statValue}>~300 kcal</Text>
            </View>
          </View>

          {/* Creator Info */}
          <View style={styles.creatorSection}>
            <Text style={styles.creatorSectionTitle}>Criador da Missão</Text>
            <View style={styles.creatorInfo}>
              <Image source={{ uri: mission.creator.avatar }} style={styles.creatorAvatar} />
              <View style={styles.creatorDetails}>
                <Text style={styles.creatorLabel}>Criador</Text>
                <Text style={styles.creatorName}>{mission.creator.name}</Text>
                <Text style={styles.creatorBio}>Especialista em narrativas épicas e desafios motivacionais</Text>
              </View>
            </View>
          </View>

          {/* Mission Features */}
          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>O que você vai encontrar:</Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Ionicons name="headset" size={16} color="#00bfff" />
                <Text style={styles.featureText}>Narrativa imersiva com áudio</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="map" size={16} color="#00bfff" />
                <Text style={styles.featureText}>Mapa interativo em tempo real</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="trophy" size={16} color="#00bfff" />
                <Text style={styles.featureText}>Recompensas e conquistas</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="analytics" size={16} color="#00bfff" />
                <Text style={styles.featureText}>Métricas detalhadas de performance</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Start Mission Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => navigation.navigate('Execution', { mission })}
        >
          <Text style={styles.startButtonText}>Iniciar a missão</Text>
          <Ionicons name="arrow-forward" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  bannerContainer: {
    position: 'relative',
  },
  banner: {
    height: 250,
    justifyContent: 'flex-start',
  },
  bannerImage: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  titleSection: {
    marginBottom: 16,
  },
  missionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  missionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  points: {
    color: '#00bfff',
    fontSize: 16,
    fontWeight: '600',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  difficultyIcon: {
    fontSize: 14,
  },
  difficultyText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    color: '#ddd',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#121212',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
    marginTop: 8,
    marginBottom: 4,
  },
  statValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  creatorSection: {
    marginBottom: 24,
  },
  creatorSectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  creatorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  creatorDetails: {
    flex: 1,
  },
  creatorLabel: {
    color: '#888',
    fontSize: 12,
    marginBottom: 2,
  },
  creatorName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  creatorBio: {
    color: '#bbb',
    fontSize: 12,
    lineHeight: 16,
  },
  featuresSection: {
    marginBottom: 24,
  },
  featuresTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    color: '#ddd',
    fontSize: 14,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  startButton: {
    backgroundColor: '#165a96',
    borderRadius: 25,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
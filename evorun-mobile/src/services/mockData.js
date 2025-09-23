// Mock data para simular backend

export const mockUser = {
  id: 1,
  name: 'João Silva',
  email: 'joao@example.com',
  avatar: 'https://via.placeholder.com/100x100/00bfff/ffffff?text=JS',
  level: 12,
  totalPoints: 45230,
  weeklyPoints: 1250,
  totalDistance: 127.5,
  totalTime: '24:15:30',
  achievements: [
    { id: 1, name: 'Primeiro Passo', icon: '🏃', unlocked: true },
    { id: 2, name: 'Maratonista', icon: '🏆', unlocked: false },
    { id: 3, name: 'Velocista', icon: '⚡', unlocked: true },
  ],
};

export const mockMissions = [
  {
    id: 1,
    title: 'Missão Inicial',
    description: 'Você acaba de ser convocado para sua primeira missão como Guardião da Chama Interior. O objetivo é simples, mas simbólico: correr por 3km até alcançar o antigo marco de Evorun. Essa trilha revela não apenas o terreno, mas a força interior de quem a percorrer. É o início da sua jornada, o primeiro passo em direção à sua própria lenda.',
    distance: '3km',
    difficulty: 'Iniciante',
    points: '23k',
    duration: '30-45 min',
    calories: '~300 kcal',
    completed: false,
    creator: {
      name: 'Empress Poison',
      avatar: 'https://via.placeholder.com/40x40/ff6b6b/ffffff?text=EP',
      bio: 'Especialista em narrativas épicas e desafios motivacionais',
    },
    banner: 'https://via.placeholder.com/400x300/1a1a1a/ffffff?text=Mission+1+Banner',
    features: [
      'Narrativa imersiva com áudio',
      'Mapa interativo em tempo real',
      'Recompensas e conquistas',
      'Métricas detalhadas de performance',
    ],
  },
  {
    id: 2,
    title: 'O Despertar da Força',
    description: 'A segunda etapa da sua jornada como Guardião requer mais do que resistência física. Você deve percorrer 5km através da Floresta dos Sussurros, onde cada passo ecoa com os segredos dos antigos corredores. Prepare-se para descobrir habilidades que nem sabia que possuía.',
    distance: '5km',
    difficulty: 'Intermediário',
    points: '35k',
    duration: '45-60 min',
    calories: '~500 kcal',
    completed: false,
    creator: {
      name: 'Shadow Runner',
      avatar: 'https://via.placeholder.com/40x40/8e44ad/ffffff?text=SR',
      bio: 'Mestre em desafios de resistência e superação',
    },
    banner: 'https://via.placeholder.com/400x300/2c3e50/ffffff?text=Mission+2+Banner',
    features: [
      'Narrativa imersiva com áudio',
      'Desafios de ritmo variável',
      'Sistema de conquistas avançado',
      'Análise de performance detalhada',
    ],
  },
  {
    id: 3,
    title: 'Tempestade Interior',
    description: 'O teste definitivo chegou. Uma corrida de 10km através do Vale das Tempestades, onde apenas os verdadeiros Guardiões conseguem manter o foco. Esta missão não é apenas sobre velocidade ou resistência - é sobre descobrir quem você realmente é quando tudo parece impossível.',
    distance: '10km',
    difficulty: 'Avançado',
    points: '50k',
    duration: '60-90 min',
    calories: '~800 kcal',
    completed: false,
    creator: {
      name: 'Storm Master',
      avatar: 'https://via.placeholder.com/40x40/e74c3c/ffffff?text=SM',
      bio: 'Criador de desafios extremos e transformações pessoais',
    },
    banner: 'https://via.placeholder.com/400x300/34495e/ffffff?text=Mission+3+Banner',
    features: [
      'Narrativa épica com múltiplos capítulos',
      'Desafios adaptativos baseados em performance',
      'Sistema de recompensas premium',
      'Análise psicológica de performance',
    ],
  },
];

export const mockActivities = [
  {
    id: 1,
    type: 'Corrida',
    date: '2024-01-15',
    time: '07:30',
    distance: 3.2,
    duration: '28:45',
    pace: '8:58',
    calories: 285,
    points: 320,
    mission: 'Missão Inicial',
  },
  {
    id: 2,
    type: 'Corrida',
    date: '2024-01-13',
    time: '18:15',
    distance: 2.8,
    duration: '25:12',
    pace: '9:00',
    calories: 245,
    points: 280,
    mission: null,
  },
  {
    id: 3,
    type: 'Corrida',
    date: '2024-01-11',
    time: '06:45',
    distance: 5.1,
    duration: '42:30',
    pace: '8:20',
    calories: 445,
    points: 510,
    mission: 'O Despertar da Força',
  },
  {
    id: 4,
    type: 'Caminhada',
    date: '2024-01-09',
    time: '19:00',
    distance: 1.5,
    duration: '18:00',
    pace: '12:00',
    calories: 95,
    points: 75,
    mission: null,
  },
];

export const mockWeeklyChallenge = {
  id: 1,
  title: 'Desafio da Semana',
  description: 'Complete 15km esta semana',
  progress: 8.5,
  target: 15,
  reward: '500 pontos',
  daysLeft: 3,
  participants: 1247,
};

export const mockStats = {
  thisWeek: {
    distance: 8.5,
    time: '1:12:30',
    calories: 625,
    activities: 3,
  },
  thisMonth: {
    distance: 32.1,
    time: '4:45:15',
    calories: 2340,
    activities: 12,
  },
  allTime: {
    distance: 127.5,
    time: '24:15:30',
    calories: 9850,
    activities: 48,
  },
};

// Funções utilitárias para simular API calls
export const loginUser = async (email, password) => {
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (email === 'demo@evorun.com' && password === 'demo123') {
    return { success: true, user: mockUser };
  }
  
  return { success: false, error: 'Credenciais inválidas' };
};

export const getMissions = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockMissions;
};

export const getMissionById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockMissions.find(mission => mission.id === id);
};

export const getActivities = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockActivities;
};

export const getWeeklyChallenge = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockWeeklyChallenge;
};

export const getStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockStats;
};

export const completeMission = async (missionId, stats) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simula salvamento da atividade
  const newActivity = {
    id: mockActivities.length + 1,
    type: 'Corrida',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    distance: stats.distance,
    duration: stats.time,
    pace: stats.pace || '8:30',
    calories: stats.calories,
    points: stats.points,
    mission: mockMissions.find(m => m.id === missionId)?.title,
  };
  
  mockActivities.unshift(newActivity);
  
  // Atualiza pontos do usuário
  mockUser.totalPoints += stats.points;
  mockUser.weeklyPoints += stats.points;
  
  return { success: true, activity: newActivity };
};
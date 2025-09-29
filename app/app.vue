<template>
  <div class="redirect-container">
    <div class="redirect-card">
      <!-- Logo -->
      <div class="icon-container">
        <img src="https://cdn.jsdelivr.net/gh/progestionsoft/Files/_General/Logos/PGS-DC.png" alt="Logo" class="pgs-logo" />
      </div>

      <!-- Message -->
      <h1 class="title">Site déplacé</h1>      
      <p class="message">
        Ce site a été déplacé vers une nouvelle adresse.
        <br>
        <span class="redirect-url">{{ targetUrl }}</span>
      </p>

      <!-- Compteur -->
      <div class="countdown-container">
        <p class="countdown-label">Redirection automatique dans</p>

        <div class="countdown-circle">
          <svg class="countdown-svg" viewBox="0 0 100 100">
            <!-- Cercle de fond -->
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" stroke-width="8" />
            <!-- Cercle de progression -->
            <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" stroke-width="8" stroke-linecap="round"
              :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset" transform="rotate(-90 50 50)"
              class="progress-ring" />
          </svg>
          <div class="countdown-text">
            {{ countdown }}
            <span class="countdown-unit">seconde{{ countdown > 1 ? 's' : '' }}</span>
          </div>
        </div>
      </div>

      <!-- Bouton de redirection immédiate -->
      <button 
        @click="redirectNow"
        class="redirect-button"
      >
        Rediriger maintenant
      </button>

      <!-- Lien de sauvegarde -->
      <p class="backup-link">
        Si la redirection ne fonctionne pas,
        <a :href="targetUrl" class="manual-link">cliquez ici</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Configuration des domaines
const domainMap: Record<string, string> & { 'default': string } = {
  'stlk.netlify.app': 'https://eqt.netlify.app',
  'newtes.netlify.app': 'https://suitops.netlify.app',
  'default': 'https://progestionsoft.netlify.app'
}

// Variable
const initialCountdown = 5
const circumference = 2 * Math.PI * 45 
const countdown = ref(initialCountdown)
const intervalId = ref<number | null>(null)
const targetUrl = ref(domainMap['default']) 

// Animation du cercle
const dashOffset = computed(() => {
  const progress = (initialCountdown - countdown.value) / initialCountdown
  return circumference * progress
})

// Logique pour déterminer l'URL cible
const determineTargetUrl = () => {
  if (typeof window === 'undefined') return

  const hostname = window.location.hostname
  const currentPath = window.location.pathname + window.location.search + window.location.hash
  const baseUrl = domainMap[hostname] || domainMap['default']
  const finalPath = currentPath === '/' ? '' : currentPath
  
  targetUrl.value = baseUrl + finalPath
}

// Fonction de redirection
const redirectNow = () => {
  if (targetUrl.value) {
    if (intervalId.value !== null) clearInterval(intervalId.value)
    window.location.href = targetUrl.value
  } else {
    console.error("Redirection impossible : L'URL cible est indéfinie.")
    window.location.href = domainMap['default']
  }
}

// Démarrage du compteur
const startCountdown = () => {
  if (intervalId.value !== null) clearInterval(intervalId.value)

  countdown.value = initialCountdown

  // Lancement de l'intervalle
  intervalId.value = setInterval(() => {
    if (countdown.value > 1) {
      countdown.value--
    } else {
      clearInterval(intervalId.value as number)
      intervalId.value = null
      redirectNow()
    }
  }, 1000)
}

onMounted(() => {
  determineTargetUrl()
  
  if (targetUrl.value) {
    startCountdown()
  }
})

onUnmounted(() => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value)
  }
})
</script>

<style scoped>
.redirect-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 20px;
}

.redirect-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.icon-container {
  margin-bottom: 20px;
}

.pgs-logo {
  width: 60px;
  height: 60px;
  color: #3b82f6;
  animation: pulse 2s infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.6;
  }
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 20px 0;
}

.message {
  font-size: 1.1rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 30px;
}

.redirect-url {
  color: #3b82f6;
  font-weight: 600;
  word-break: break-all;
}

.countdown-container {
  margin: 30px 0;
}

.countdown-circle {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
}

.countdown-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-ring {
  transition: stroke-dashoffset 1s ease-in-out;
}

.countdown-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: 700;
  color: #3b82f6;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.countdown-unit {
  color: #6b7280;
  font-size: 0.95rem;
  font-weight: 400;
}

.redirect-button {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  margin: 20px 0 30px;
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.redirect-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(59, 130, 246, 0.4);
  background: linear-gradient(135deg, #2563eb, #1e40af);
}

.redirect-button:active {
  transform: translateY(0);
}

.backup-link {
  color: #6b7280;
  font-size: 0.9rem;
  margin-top: 20px;
}

.manual-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
}

.manual-link:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 640px) {
  .redirect-card {
    padding: 30px 20px;
    margin: 10px;
  }

  .title {
    font-size: 2rem;
  }

  .countdown-circle {
    width: 100px;
    height: 100px;
  }

  .countdown-text {
    font-size: 1.5rem;
  }
}
</style>

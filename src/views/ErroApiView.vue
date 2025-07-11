<template>
  <div class="vh-100 d-flex  flex-column justify-content-center align-items-center bg-dark">
    <div class="text-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="160" height="160" class="alert-3d-icon">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffcc00" stop-opacity="1" />
            <stop offset="100%" stop-color="#ff8800" stop-opacity="1" />
          </radialGradient>
          <filter id="shadow">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.4" />
          </filter>
        </defs>

        <polygon points="32,4 60,56 4,56" fill="url(#glow)" stroke="#000" stroke-width="1" filter="url(#shadow)" />
        <rect x="30" y="22" width="4" height="18" fill="#000" rx="2" />
        <circle cx="32" cy="46" r="3" fill="#000" />
      </svg>
    </div>

    <div class="d-flex justify-content-center align-items-center mt-3 text-center text-white px-3">
      <div>
        <h2 class="mb-3">API Indisponível</h2>
        <p>A aplicação não conseguiu se conectar ao servidor.</p>
        <p>Verifique se API BiblioTroca está em execução.</p>
        <RouterLink to="/" class="btn btn-warning mt-4">Tentar Novamente</RouterLink>
      </div>
    </div>

  </div>
</template>

<style>
.alert-3d-icon {
  animation: float3d 2s ease-in-out infinite;
  transform-origin: center;
  transform-style: preserve-3d;
}

@keyframes float3d {
  0%, 100% { transform: translateY(0) rotateX(0deg); }
  50%      { transform: translateY(-10px) rotateX(6deg); }
}

</style>

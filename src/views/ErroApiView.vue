<template>
  <div class="vh-100 d-flex justify-content-center align-items-center bg-dark">
    <div class="text-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor"
        class="text-warning bi bi-exclamation-triangle-fill float-animation" viewBox="0 0 16 16">
        <path
          d="M8.982 1.566a1.13 1.13 0 0 0-1.964 0L.165 13.233c-.457.778.091 1.767.982 1.767h13.706c.89 0 1.438-.99.982-1.767L8.982 1.566zm-.982.874c.2 0 .378.118.463.3l.002.003 6.857 11.616a.535.535 0 0 1-.463.812H1.141a.535.535 0 0 1-.463-.812L7.537 2.743a.535.535 0 0 1 .463-.3zM8 5c-.535 0-.954.462-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507c.054-.533-.365-.995-.9-.995zm-.002 6a1 1 0 1 0 .002 2 1 1 0 0 0-.002-2z" />
      </svg>
    </div>
  </div>
</template>

<style>
.float-animation {
  animation: floatUpDown 2s ease-in-out infinite;
  transform-origin: center;
}

@keyframes floatUpDown {

  0%,
  100% {
    transform: translateY(0) rotateX(0deg);
  }

  50% {
    transform: translateY(-12px) rotateX(8deg);
  }
}
</style>

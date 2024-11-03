<script setup lang="ts">
import { ref } from "vue";
import AudioPlayer from "./AudioPlayer.vue";
import WaveformVisualizer from "./WaveformVisualizer.vue";
import TimeDisplay from "./TimeDisplay.vue";

const messageText = `With over 5+ years of experience in the tech industry, I've had the privilege of working on a wildly diverse array of projects across numerous platforms and technologies. While I began my career focused on web development, I've since expanded my skills to include mobile apps, backend systems, machine learning, and more. At this point I feel comfortable calling myself a "Jack of all trades, master of some". While full mastery may be elusive due to the field's rapid rate of change, I love the challenge of picking up new skills and finding creative solutions to whatever problem is at hand. What truly drives me is the opportunity to use technology to build innovative products and services that help improve people's lives. Outside of my regular work, I enjoy sharing my knowledge by writing technical blogs and helping others through mentorship and volunteering. I strive to build an inclusive community where people from all backgrounds can feel welcomed and supported in their technology learning journey. On the more lighthearted side, I'm also an avid dad-joker who likes to spice up code reviews with funny memes and GIFs. After so many years in the field, I've learned that there is no single path to becoming an exceptional engineer. What matters most is an unrelenting passion for creation, continuous learning and a dedication to craftsmanship. It's been an honor to have played a small part in advancing the technology industry to where it is today, and I look forward to many more years of growth and discovery ahead. If any of the above resonates with you and your needs, I would love to discuss a potential collaboration. Please feel free to reach out - I'm always eager to take on new challenges.`;
</script>

<template>
  <div class="voice-message">
    <div class="message-container">
      <AudioPlayer :message-text="messageText">
        <template #default="{ isPlaying, progress, onSeek, togglePlay }">
          <button class="play-button" @click="togglePlay">
            <span v-if="!isPlaying">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                />
              </svg>

              <i class="pi pi-check"></i>
            </span>
            <span v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
          </button>

          <div class="progress-container">
            <WaveformVisualizer :progress="progress" @seek="onSeek" />
          </div>
        </template>
      </AudioPlayer>
    </div>
  </div>
</template>

<style scoped>
.voice-message {
  /* background: #0d0d0eff; */
  padding: 1rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 500px;
  margin: 1rem auto;
}

.message-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.play-button {
  background: #070808ff;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 1.2rem;
}

.progress-container {
  flex: 1;
  margin: 0 1rem;
}
</style>

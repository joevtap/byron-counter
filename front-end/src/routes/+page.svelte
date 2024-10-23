<script lang="ts">
  import { io } from "socket.io-client";

  const socket = io("http://localhost:8080");

  let count = $state(0);

  socket.on("update", (data) => {
    count = data.count;
  });
</script>

<main class="flex items-center justify-center h-screen flex-col gap-6">
  <h1 class="font-mono text-2xl">{"<byron.counter>"}</h1>
  <p class="font-mono text-3xl">
    {count}
  </p>

  <div class="flex align-center justify-center gap-4">
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold w-14 h-14 rounded"
      onclick={() => {
        socket.emit("increment");
      }}
    >
      +
    </button>
    <button
      class="bg-red-500 hover:bg-red-700 text-white font-bold w-14 h-14 rounded"
      onclick={() => {
        socket.emit("decrement");
      }}
    >
      -
    </button>
  </div>
</main>

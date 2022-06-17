<template>
  <div class="start-chat-container">
    <div class="start-chat">
      <img :src="require('@/assets/images/img_default.png')" />
      <div class="start-text">開始使用Cherri Chat!</div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "StatChat",
};
</script>

<style lang="scss">
.start-chat-container {
  width: 100%;
  width: 100%;
  .start-chat {
    height: 95vh;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    flex-direction: column;     
  }

  img {
    width: 400px;
    height: auto;
  }

  .start-text {
    color: #478ee2;
    font-size: 48px;
  }
}
</style>

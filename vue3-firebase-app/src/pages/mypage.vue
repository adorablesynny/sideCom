<template>
  <div>
    <div class="text-h2">마이페이지 💕</div>
    <ul>
      <li>
        <router-link to="/mypage/profile">프로필로 이동</router-link>
      </li>
      <li>
        <router-link to="/mypage/password">패스워드 변경</router-link>
      </li>
      <li>
        <router-link to="/mypage/bookmark">북마크로 이동</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>

<template>
  <div id='MuiPlayer'>
    <!-- 视频播放器的容器 -->
    <div id="mui-player"></div>

    <!-- 播放器非全屏模式下显示的控件 -->
    <v-card
      tile
      flat
      color="#f7f5f6"
    >
      <v-card-text class="d-flex align-center">
        <!-- 装载了多少条弹幕 -->
        <span>{{ barrageCount }} 条弹幕</span>

        <!-- 弹幕开关 -->
        <v-btn
          plain
          icon
          class="ml-2"
          @click="barrage.open = !barrage.open"
        >
          <!-- 弹幕开 -->
          <svg
            v-show="barrage.open"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.989 4.828c-.47 0-.975.004-1.515.012l-1.71-2.566a1.008 1.008 0 00-1.678 1.118l.999 1.5c-.681.018-1.403.04-2.164.068a4.013 4.013 0 00-3.83 3.44c-.165 1.15-.245 2.545-.245 4.185 0 1.965.115 3.67.35 5.116a4.012 4.012 0 003.763 3.363l.906.046c1.205.063 1.808.095 3.607.095a.988.988 0 000-1.975c-1.758 0-2.339-.03-3.501-.092l-.915-.047a2.037 2.037 0 01-1.91-1.708c-.216-1.324-.325-2.924-.325-4.798 0-1.563.076-2.864.225-3.904.14-.977.96-1.713 1.945-1.747 2.444-.087 4.465-.13 6.063-.131 1.598 0 3.62.044 6.064.13.96.034 1.71.81 1.855 1.814.075.524.113 1.962.141 3.065v.002c.01.342.017.65.025.88a.987.987 0 101.974-.068c-.008-.226-.016-.523-.025-.856v-.027c-.03-1.118-.073-2.663-.16-3.276-.273-1.906-1.783-3.438-3.74-3.507-.9-.032-1.743-.058-2.531-.078l1.05-1.46a1.008 1.008 0 00-1.638-1.177l-1.862 2.59c-.38-.004-.744-.007-1.088-.007h-.13zm.521 4.775h-1.32v4.631h2.222v.847h-2.618v1.078h2.618l.003.678c.36.026.714.163 1.01.407h.11v-1.085h2.694v-1.078h-2.695v-.847H16.8v-4.63h-1.276a8.59 8.59 0 00.748-1.42L15.183 7.8a14.232 14.232 0 01-.814 1.804h-1.518l.693-.308a8.862 8.862 0 00-.814-1.408l-1.045.352c.297.396.572.847.825 1.364zm-4.18 3.564l.154-1.485h1.98V8.294h-3.2v.98H9.33v1.43H7.472l-.308 3.453h2.277c0 1.166-.044 1.925-.12 2.277-.078.352-.386.528-.936.528-.308 0-.616-.022-.902-.055l.297 1.067.062.005c.285.02.551.04.818.04 1.001-.067 1.562-.419 1.694-1.057.11-.638.176-1.903.176-3.795h-2.2zm7.458.11v-.858h-1.254v.858h1.254zm-2.376-.858v.858h-1.199v-.858h1.2zm-1.199-.946h1.2v-.902h-1.2v.902zm2.321 0v-.902h1.254v.902h-1.254z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.846 14.627a1 1 0 00-1.412.075l-5.091 5.703-2.216-2.275-.097-.086-.008-.005a1 1 0 00-1.322 1.493l2.963 3.041.093.083.007.005c.407.315 1 .27 1.354-.124l5.81-6.505.08-.102.005-.008a1 1 0 00-.166-1.295z"
              fill="#00AEEC"
            ></path>
          </svg>
          <!-- 弹幕关 -->
          <svg
            v-show="!barrage.open"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.085 4.891l-.999-1.499a1.008 1.008 0 011.679-1.118l1.709 2.566c.54-.008 1.045-.012 1.515-.012h.13c.345 0 .707.003 1.088.007l1.862-2.59a1.008 1.008 0 011.637 1.177l-1.049 1.46c.788.02 1.631.046 2.53.078 1.958.069 3.468 1.6 3.74 3.507.088.613.13 2.158.16 3.276l.001.027c.01.333.017.63.025.856a.987.987 0 01-1.974.069c-.008-.23-.016-.539-.025-.881v-.002c-.028-1.103-.066-2.541-.142-3.065-.143-1.004-.895-1.78-1.854-1.813-2.444-.087-4.466-.13-6.064-.131-1.598 0-3.619.044-6.063.13a2.037 2.037 0 00-1.945 1.748c-.15 1.04-.225 2.341-.225 3.904 0 1.874.11 3.474.325 4.798.154.949.95 1.66 1.91 1.708a97.58 97.58 0 005.416.139.988.988 0 010 1.975c-2.196 0-3.61-.047-5.513-.141A4.012 4.012 0 012.197 17.7c-.236-1.446-.351-3.151-.351-5.116 0-1.64.08-3.035.245-4.184A4.013 4.013 0 015.92 4.96c.761-.027 1.483-.05 2.164-.069zm4.436 4.707h-1.32v4.63h2.222v.848h-2.618v1.078h2.431a5.01 5.01 0 013.575-3.115V9.598h-1.276a8.59 8.59 0 00.748-1.42l-1.089-.384a14.232 14.232 0 01-.814 1.804h-1.518l.693-.308a8.862 8.862 0 00-.814-1.408l-1.045.352c.297.396.572.847.825 1.364zm-4.18 3.564l.154-1.485h1.98V8.289h-3.2v.979h2.067v1.43H7.483l-.308 3.454h2.277c0 1.166-.044 1.925-.12 2.277-.078.352-.386.528-.936.528-.308 0-.616-.022-.902-.055l.297 1.067.062.004c.285.02.551.04.818.04 1.001-.066 1.562-.418 1.694-1.056.11-.638.176-1.903.176-3.795h-2.2zm7.458.11v-.858h-1.254v.858H15.8zm-2.376-.858v.858h-1.199v-.858h1.2zm-1.199-.946h1.2v-.902h-1.2v.902zm2.321 0v-.902H15.8v.902h-1.254zm3.517 10.594a4 4 0 100-8 4 4 0 000 8zm-.002-1.502a2.5 2.5 0 01-2.217-3.657l3.326 3.398a2.49 2.49 0 01-1.109.259zm2.5-2.5c0 .42-.103.815-.286 1.162l-3.328-3.401a2.5 2.5 0 013.614 2.239z"
            ></path>
          </svg>
        </v-btn>

        <!-- 弹幕设置菜单 -->
        <v-menu
          top
          offset-y
          origin="bottom center"
          nudge-top="10"
          nudge-left="157"
          transition="scale-transition"
          :close-on-content-click="false"
        >
          <template #activator="{on, attrs}">
            <!-- 弹幕设置 -->
            <v-btn
              plain
              icon
              v-on="on"
              v-bind="attrs"
            >
              <!-- 控件图标 -->
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.645 4.881l1.06-1.473a.998.998 0 10-1.622-1.166L13.22 4.835a110.67 110.67 0 00-1.1-.007h-.131c-.47 0-.975.004-1.515.012L8.783 2.3A.998.998 0 007.12 3.408l.988 1.484c-.688.019-1.418.042-2.188.069a4.013 4.013 0 00-3.83 3.44c-.165 1.15-.245 2.545-.245 4.185 0 1.965.115 3.67.35 5.116a4.012 4.012 0 003.763 3.363c1.903.094 3.317.141 5.513.141a.988.988 0 000-1.975 97.58 97.58 0 01-5.416-.139 2.037 2.037 0 01-1.91-1.708c-.216-1.324-.325-2.924-.325-4.798 0-1.563.076-2.864.225-3.904.14-.977.96-1.713 1.945-1.747 2.444-.087 4.465-.13 6.063-.131 1.598 0 3.62.044 6.064.13.96.034 1.71.81 1.855 1.814.075.524.113 1.962.141 3.065v.002c.005.183.01.07.014-.038.004-.096.008-.189.011-.081a.987.987 0 101.974-.069c-.004-.105-.007-.009-.011.09-.002.056-.004.112-.007.135l-.002.01a.574.574 0 01-.005-.091v-.027c-.03-1.118-.073-2.663-.16-3.276-.273-1.906-1.783-3.438-3.74-3.507-.905-.032-1.752-.058-2.543-.079zm-3.113 4.703h-1.307v4.643h2.2v.04l.651-1.234c.113-.215.281-.389.482-.509v-.11h.235c.137-.049.283-.074.433-.074h1.553V9.584h-1.264a8.5 8.5 0 00.741-1.405l-1.078-.381c-.24.631-.501 1.23-.806 1.786h-1.503l.686-.305c-.228-.501-.5-.959-.806-1.394l-1.034.348c.294.392.566.839.817 1.35zm-1.7 5.502h2.16l-.564 1.068h-1.595v-1.068zm-2.498-1.863l.152-1.561h1.96V8.289H7.277v.969h2.048v1.435h-1.84l-.306 3.51h2.254c0 1.155-.043 1.906-.12 2.255-.076.348-.38.523-.925.523-.305 0-.61-.022-.893-.055l.294 1.056.061.005c.282.02.546.039.81.039.991-.065 1.547-.414 1.677-1.046.11-.631.175-1.883.175-3.757H8.334zm5.09-.8v.85h-1.188v-.85h1.187zm-1.188-.955h1.187v-.893h-1.187v.893zm2.322.007v-.893h1.241v.893h-1.241zm.528 2.757a1.26 1.26 0 011.087-.627l4.003-.009a1.26 1.26 0 011.094.63l1.721 2.982c.226.39.225.872-.001 1.263l-1.743 3a1.26 1.26 0 01-1.086.628l-4.003.009a1.26 1.26 0 01-1.094-.63l-1.722-2.982a1.26 1.26 0 01.002-1.263l1.742-3zm1.967.858a1.26 1.26 0 00-1.08.614l-.903 1.513a1.26 1.26 0 00-.002 1.289l.885 1.492c.227.384.64.62 1.086.618l2.192-.005a1.26 1.26 0 001.08-.615l.904-1.518a1.26 1.26 0 00.001-1.288l-.884-1.489a1.26 1.26 0 00-1.086-.616l-2.193.005zm2.517 2.76a1.4 1.4 0 11-2.8 0 1.4 1.4 0 012.8 0z"
                ></path>
              </svg>
            </v-btn>
          </template>

          <!-- 弹幕设置的菜单 -->
          <v-card
            tile
            dark
            width="350"
            max-width="350"
            color="rgba(28,28,28,0.9)"
          >
            <v-card-title class="text-body-1">弹幕设置</v-card-title>
            <v-card-text class="white--text text-caption">
              <v-divider></v-divider>

              <!-- 不透明度 -->
              <div class="d-flex align-center my-3">
                <span class="mr-3">不透明度</span>
                <v-slider
                  hide-details
                  thumb-color="info"
                  v-model="barrage.opacity"
                  max="1"
                  min="0.1"
                  step="0.1"
                  track-color="grey"
                  track-fill-color="blue"
                >
                  <!-- 拇指标签的文字处理 -->
                  <template #thumb-label="{value}">
                    {{ value * 100 + '%' }}
                  </template>
                </v-slider>
              </div>

              <!-- 弹幕字号 -->
              <div class="d-flex align-center my-3">
                <span class="mr-3">弹幕字号</span>
                <v-slider
                  hide-details
                  class="text-caption"
                  thumb-color="info"
                  v-model="barrage.fontSize"
                  max="2"
                  min="0"
                  step="1"
                  track-color="grey"
                  track-fill-color="blue"
                  tick-size="4"
                  :tick-labels="['小','适中','大']"
                >
                </v-slider>
              </div>

              <!-- 弹幕速度 -->
              <div class="d-flex align-center my-3">
                <span class="mr-3">弹幕速度</span>
                <v-slider
                  hide-details
                  class="text-caption"
                  thumb-color="info"
                  v-model="barrage.speed"
                  max="2"
                  min="0"
                  step="1"
                  track-color="grey"
                  track-fill-color="blue"
                  tick-size="4"
                  :tick-labels="['慢','适中','快']"
                >
                </v-slider>
              </div>

              <!-- 弹幕显示区域 -->
              <div class="d-flex align-center my-3">
                <span class="mr-3">显示区域</span>
                <v-slider
                  hide-details
                  class="text-caption"
                  thumb-color="info"
                  v-model="barrage.area"
                  max="1"
                  min="0.25"
                  step="0.25"
                  track-color="grey"
                  track-fill-color="blue"
                  tick-size="4"
                  :tick-labels="['1/4','半屏','3/4','满屏']"
                >
                </v-slider>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>

        <!-- 发送弹幕输入框 -->
        <v-text-field
          flat
          solo
          dense
          hide-details
          class="ml-2"
          prepend-inner-icon="mdi-palette"
          placeholder="来一笔弹幕压压惊~~~"
          background-color="grey lighten-2"
        ></v-text-field>

        <!-- 发送弹幕按钮 -->
        <v-btn
          color="info"
          width="90"
          height="38"
          class="ml-2"
        >发送</v-btn>
      </v-card-text>
    </v-card>

    <!-- 自定义左侧脚部控件 -->
    <div id="customLeftFooterControls">
      <!-- 下一集 -->
      <button
        id="nextMedia"
        @click="value = 3"
        class="player-btn footer-control keyboard-input"
        title="下一集"
        v-show="customControls.footer.left.nextMedia"
      >
        <svg
          t="1584686776454"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1682"
          width="23"
          height="23"
        >
          <path
            d="M783.14692466 563.21664097L240.85307534 879.55472126c-39.1656664 24.10194914-90.38230866-6.02548665-90.38230865-51.21664226v-632.676158c0-45.19115433 51.21664097-75.31859011 90.38230865-51.21664226l542.29384932 316.33808029c39.1656664 21.08920518 39.1656664 81.34407804 0 102.43328194z"
            p-id="1683"
            fill="#ffffff"
          ></path>
          <path
            d="M873.52923331 734.94302767c0 42.17841036-39.1656664 78.33133408-90.38230865 78.33133407s-90.38230866-36.15292371-90.38230735-78.33133407V289.05697233c0-42.17841036 39.1656664-78.33133408 90.38230735-78.33133407s90.38230866 36.15292371 90.38230865 78.33133407v445.88605534z"
            p-id="1684"
            fill="#ffffff"
          ></path>
        </svg>
      </button>
    </div>

    <!-- 自定义右侧脚部控件 -->
    <div id="customRightFooterControls">
      <!-- 弹幕设置图标 -->
      <button
        ref="barrageSettingBtn"
        @mouseover="showBarrageSettingMenu(true)"
        style="width:max-content;"
        class="player-btn keyboard-input footer-control"
        v-show="customControls.footer.right.barrageSetting"
      >
        <!-- 弹幕设置的卡片 -->
        <v-card
          tile
          dark
          ref="barrageSettingMenu"
          @mouseleave="showBarrageSettingMenu(false)"
          style="position: absolute;"
          :style="`left:${player.barrageSetting.left}px; top: ${player.barrageSetting.top}px;`"
          width="350"
          max-width="350"
          color="rgba(28,28,28,0.9)"
        >
          <v-card-title class="text-body-1">弹幕设置</v-card-title>
          <v-card-text class="white--text text-caption">
            <v-divider></v-divider>

            <!-- 不透明度 -->
            <div class="d-flex align-center my-3">
              <span class="mr-3">不透明度</span>
              <v-slider
                hide-details
                thumb-color="info"
                v-model="barrage.opacity"
                max="1"
                min="0.1"
                step="0.1"
                track-color="grey"
                track-fill-color="blue"
              >
                <!-- 拇指标签的文字处理 -->
                <template #thumb-label="{value}">
                  {{ value * 100 + '%' }}
                </template>
              </v-slider>
            </div>

            <!-- 弹幕字号 -->
            <div class="d-flex align-center my-3">
              <span class="mr-3">弹幕字号</span>
              <v-slider
                hide-details
                class="text-caption"
                thumb-color="info"
                v-model="barrage.fontSize"
                max="2"
                min="0"
                step="1"
                track-color="grey"
                track-fill-color="blue"
                tick-size="4"
                :tick-labels="['小','适中','大']"
              >
              </v-slider>
            </div>

            <!-- 弹幕速度 -->
            <div class="d-flex align-center my-3">
              <span class="mr-3">弹幕速度</span>
              <v-slider
                hide-details
                class="text-caption"
                thumb-color="info"
                v-model="barrage.speed"
                max="2"
                min="0"
                step="1"
                track-color="grey"
                track-fill-color="blue"
                tick-size="4"
                :tick-labels="['慢','适中','快']"
              >
              </v-slider>
            </div>

            <!-- 弹幕显示区域 -->
            <div class="d-flex align-center my-3">
              <span class="mr-3">显示区域</span>
              <v-slider
                hide-details
                class="text-caption"
                thumb-color="info"
                v-model="barrage.area"
                max="1"
                min="0.25"
                step="0.25"
                track-color="grey"
                track-fill-color="blue"
                tick-size="4"
                :tick-labels="['1/4','半屏','3/4','满屏']"
              >
              </v-slider>
            </div>
          </v-card-text>
        </v-card>

        <!-- 控件图标 -->
        <svg
          fill="white"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.645 4.881l1.06-1.473a.998.998 0 10-1.622-1.166L13.22 4.835a110.67 110.67 0 00-1.1-.007h-.131c-.47 0-.975.004-1.515.012L8.783 2.3A.998.998 0 007.12 3.408l.988 1.484c-.688.019-1.418.042-2.188.069a4.013 4.013 0 00-3.83 3.44c-.165 1.15-.245 2.545-.245 4.185 0 1.965.115 3.67.35 5.116a4.012 4.012 0 003.763 3.363c1.903.094 3.317.141 5.513.141a.988.988 0 000-1.975 97.58 97.58 0 01-5.416-.139 2.037 2.037 0 01-1.91-1.708c-.216-1.324-.325-2.924-.325-4.798 0-1.563.076-2.864.225-3.904.14-.977.96-1.713 1.945-1.747 2.444-.087 4.465-.13 6.063-.131 1.598 0 3.62.044 6.064.13.96.034 1.71.81 1.855 1.814.075.524.113 1.962.141 3.065v.002c.005.183.01.07.014-.038.004-.096.008-.189.011-.081a.987.987 0 101.974-.069c-.004-.105-.007-.009-.011.09-.002.056-.004.112-.007.135l-.002.01a.574.574 0 01-.005-.091v-.027c-.03-1.118-.073-2.663-.16-3.276-.273-1.906-1.783-3.438-3.74-3.507-.905-.032-1.752-.058-2.543-.079zm-3.113 4.703h-1.307v4.643h2.2v.04l.651-1.234c.113-.215.281-.389.482-.509v-.11h.235c.137-.049.283-.074.433-.074h1.553V9.584h-1.264a8.5 8.5 0 00.741-1.405l-1.078-.381c-.24.631-.501 1.23-.806 1.786h-1.503l.686-.305c-.228-.501-.5-.959-.806-1.394l-1.034.348c.294.392.566.839.817 1.35zm-1.7 5.502h2.16l-.564 1.068h-1.595v-1.068zm-2.498-1.863l.152-1.561h1.96V8.289H7.277v.969h2.048v1.435h-1.84l-.306 3.51h2.254c0 1.155-.043 1.906-.12 2.255-.076.348-.38.523-.925.523-.305 0-.61-.022-.893-.055l.294 1.056.061.005c.282.02.546.039.81.039.991-.065 1.547-.414 1.677-1.046.11-.631.175-1.883.175-3.757H8.334zm5.09-.8v.85h-1.188v-.85h1.187zm-1.188-.955h1.187v-.893h-1.187v.893zm2.322.007v-.893h1.241v.893h-1.241zm.528 2.757a1.26 1.26 0 011.087-.627l4.003-.009a1.26 1.26 0 011.094.63l1.721 2.982c.226.39.225.872-.001 1.263l-1.743 3a1.26 1.26 0 01-1.086.628l-4.003.009a1.26 1.26 0 01-1.094-.63l-1.722-2.982a1.26 1.26 0 01.002-1.263l1.742-3zm1.967.858a1.26 1.26 0 00-1.08.614l-.903 1.513a1.26 1.26 0 00-.002 1.289l.885 1.492c.227.384.64.62 1.086.618l2.192-.005a1.26 1.26 0 001.08-.615l.904-1.518a1.26 1.26 0 00.001-1.288l-.884-1.489a1.26 1.26 0 00-1.086-.616l-2.193.005zm2.517 2.76a1.4 1.4 0 11-2.8 0 1.4 1.4 0 012.8 0z"
          ></path>
        </svg>
      </button>

      <!-- 弹幕开关图标 -->
      <button
        class="player-btn keyboard-input footer-control"
        v-show="customControls.footer.right.barrageOpenClose"
      >
        <!-- 弹幕开 -->
        <svg
          v-show="barrage.open"
          @click="barrage.open = false"
          fill="white"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.989 4.828c-.47 0-.975.004-1.515.012l-1.71-2.566a1.008 1.008 0 00-1.678 1.118l.999 1.5c-.681.018-1.403.04-2.164.068a4.013 4.013 0 00-3.83 3.44c-.165 1.15-.245 2.545-.245 4.185 0 1.965.115 3.67.35 5.116a4.012 4.012 0 003.763 3.363l.906.046c1.205.063 1.808.095 3.607.095a.988.988 0 000-1.975c-1.758 0-2.339-.03-3.501-.092l-.915-.047a2.037 2.037 0 01-1.91-1.708c-.216-1.324-.325-2.924-.325-4.798 0-1.563.076-2.864.225-3.904.14-.977.96-1.713 1.945-1.747 2.444-.087 4.465-.13 6.063-.131 1.598 0 3.62.044 6.064.13.96.034 1.71.81 1.855 1.814.075.524.113 1.962.141 3.065v.002c.01.342.017.65.025.88a.987.987 0 101.974-.068c-.008-.226-.016-.523-.025-.856v-.027c-.03-1.118-.073-2.663-.16-3.276-.273-1.906-1.783-3.438-3.74-3.507-.9-.032-1.743-.058-2.531-.078l1.05-1.46a1.008 1.008 0 00-1.638-1.177l-1.862 2.59c-.38-.004-.744-.007-1.088-.007h-.13zm.521 4.775h-1.32v4.631h2.222v.847h-2.618v1.078h2.618l.003.678c.36.026.714.163 1.01.407h.11v-1.085h2.694v-1.078h-2.695v-.847H16.8v-4.63h-1.276a8.59 8.59 0 00.748-1.42L15.183 7.8a14.232 14.232 0 01-.814 1.804h-1.518l.693-.308a8.862 8.862 0 00-.814-1.408l-1.045.352c.297.396.572.847.825 1.364zm-4.18 3.564l.154-1.485h1.98V8.294h-3.2v.98H9.33v1.43H7.472l-.308 3.453h2.277c0 1.166-.044 1.925-.12 2.277-.078.352-.386.528-.936.528-.308 0-.616-.022-.902-.055l.297 1.067.062.005c.285.02.551.04.818.04 1.001-.067 1.562-.419 1.694-1.057.11-.638.176-1.903.176-3.795h-2.2zm7.458.11v-.858h-1.254v.858h1.254zm-2.376-.858v.858h-1.199v-.858h1.2zm-1.199-.946h1.2v-.902h-1.2v.902zm2.321 0v-.902h1.254v.902h-1.254z"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22.846 14.627a1 1 0 00-1.412.075l-5.091 5.703-2.216-2.275-.097-.086-.008-.005a1 1 0 00-1.322 1.493l2.963 3.041.093.083.007.005c.407.315 1 .27 1.354-.124l5.81-6.505.08-.102.005-.008a1 1 0 00-.166-1.295z"
            fill="#00AEEC"
          ></path>
        </svg>
        <!-- 弹幕关 -->
        <svg
          v-show="!barrage.open"
          @click="barrage.open = true"
          fill="white"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.085 4.891l-.999-1.499a1.008 1.008 0 011.679-1.118l1.709 2.566c.54-.008 1.045-.012 1.515-.012h.13c.345 0 .707.003 1.088.007l1.862-2.59a1.008 1.008 0 011.637 1.177l-1.049 1.46c.788.02 1.631.046 2.53.078 1.958.069 3.468 1.6 3.74 3.507.088.613.13 2.158.16 3.276l.001.027c.01.333.017.63.025.856a.987.987 0 01-1.974.069c-.008-.23-.016-.539-.025-.881v-.002c-.028-1.103-.066-2.541-.142-3.065-.143-1.004-.895-1.78-1.854-1.813-2.444-.087-4.466-.13-6.064-.131-1.598 0-3.619.044-6.063.13a2.037 2.037 0 00-1.945 1.748c-.15 1.04-.225 2.341-.225 3.904 0 1.874.11 3.474.325 4.798.154.949.95 1.66 1.91 1.708a97.58 97.58 0 005.416.139.988.988 0 010 1.975c-2.196 0-3.61-.047-5.513-.141A4.012 4.012 0 012.197 17.7c-.236-1.446-.351-3.151-.351-5.116 0-1.64.08-3.035.245-4.184A4.013 4.013 0 015.92 4.96c.761-.027 1.483-.05 2.164-.069zm4.436 4.707h-1.32v4.63h2.222v.848h-2.618v1.078h2.431a5.01 5.01 0 013.575-3.115V9.598h-1.276a8.59 8.59 0 00.748-1.42l-1.089-.384a14.232 14.232 0 01-.814 1.804h-1.518l.693-.308a8.862 8.862 0 00-.814-1.408l-1.045.352c.297.396.572.847.825 1.364zm-4.18 3.564l.154-1.485h1.98V8.289h-3.2v.979h2.067v1.43H7.483l-.308 3.454h2.277c0 1.166-.044 1.925-.12 2.277-.078.352-.386.528-.936.528-.308 0-.616-.022-.902-.055l.297 1.067.062.004c.285.02.551.04.818.04 1.001-.066 1.562-.418 1.694-1.056.11-.638.176-1.903.176-3.795h-2.2zm7.458.11v-.858h-1.254v.858H15.8zm-2.376-.858v.858h-1.199v-.858h1.2zm-1.199-.946h1.2v-.902h-1.2v.902zm2.321 0v-.902H15.8v.902h-1.254zm3.517 10.594a4 4 0 100-8 4 4 0 000 8zm-.002-1.502a2.5 2.5 0 01-2.217-3.657l3.326 3.398a2.49 2.49 0 01-1.109.259zm2.5-2.5c0 .42-.103.815-.286 1.162l-3.328-3.401a2.5 2.5 0 013.614 2.239z"
          ></path>
        </svg>
      </button>

      <!-- 倍速 -->
      <button
        ref="doubleSpeedBtn"
        @mouseover="showDoubleSpeedMenu(true)"
        class="player-btn keyboard-input footer-control"
        style="width:max-content;"
      >
        <v-card
          tile
          dark
          color="rgba(28,28,28,.9)"
          ref="doubleSpeedMenu"
          width="max-content"
          min-width="max-content"
          style="position: absolute;"
          :style="`left:${player.doubleSpeed.left}px; top: ${player.doubleSpeed.top}px;`"
          @mouseleave="showDoubleSpeedMenu(false)"
        >
          <v-card-text class="pa-0">
            <v-list
              dense
              class="py-0"
              color="rgba(0,0,0,0)"
            >
              <v-list-item-group
                mandatory
                v-model="player.doubleSpeed.value"
              >
                <v-list-item
                  class="px-6"
                  input-value="null"
                  v-for="speed in player.doubleSpeed.list"
                  :key="speed.id"
                  :value="speed.speed"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ speed.text }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
        <span>{{ player.doubleSpeed.value == 1 ? '倍速' : player.doubleSpeed.value + 'x'  }}</span>
      </button>

      <!-- 清晰度 -->
      <button
        ref="clarityBtn"
        @mouseover="showClarityMenu(true)"
        class="player-btn keyboard-input footer-control"
        style="width:max-content;"
      >
        <!-- 清晰度的菜单 -->
        <v-card
          tile
          dark
          color="rgba(28,28,28,.9)"
          ref="clarityMenu"
          width="max-content"
          min-width="max-content"
          style="position: absolute;"
          :style="`left:${player.clarity.left}px; top: ${player.clarity.top}px;`"
          @mouseleave="showClarityMenu(false)"
        >
          <v-card-text class="pa-0">
            <!-- 清晰度的菜单列表 -->
            <v-list
              dense
              class="py-0"
              color="rgba(0,0,0,0)"
            >
              <v-list-item-group
                mandatory
                v-model="player.clarity.value"
              >
                <v-list-item
                  class="px-6"
                  input-value="null"
                  v-for="clarity in player.clarity.list"
                  :key="clarity.id"
                  :value="clarity.name"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ clarity.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
        <span>{{ player.clarity.value }}</span>
      </button>

      <!-- 选集 -->
      <button
        ref="anthologyBtn"
        @mouseover="showAnthologyMenu(true)"
        class="player-btn keyboard-input footer-control"
        style="width:max-content; min-width:max-content;"
        v-show="this.customControls.footer.right.anthology.show && this.collection !== undefined && this.collection.length > 1"
      >
        <!-- 选集的菜单 -->
        <v-card
          tile
          dark
          ref="anthologyMenu"
          color="rgba(28,28,28,.9)"
          width="max-content"
          min-width="max-content"
          style="position: absolute;"
          :style="`left:${player.anthology.left}px; top: ${player.anthology.top}px;`"
          @mouseleave="showAnthologyMenu(false)"
        >
          <v-card-text
            class="my-2 pa-0 overflow-y-auto overflow-player"
            style="max-height: 350px;"
          >
            <!-- 选集的菜单列表 -->
            <v-list
              dense
              class="py-0 text-left"
              color="rgba(0,0,0,0)"
            >
              <v-list-item-group
                mandatory
                v-model="player.anthology.value"
              >
                <v-list-item
                  class="px-4"
                  input-value="null"
                  v-for="(anthology,index) in player.anthology.list"
                  :key="anthology.id"
                  :value="anthology.name"
                >
                  <!-- 选集集数 -->
                  <v-list-item-icon
                    class="mr-4"
                    width="max-content"
                  >
                    <!-- 正在播放 -->
                    <v-icon v-show="index === player.anthology.value">mdi-play-protected-content</v-icon>
                    <!-- 序列号 -->
                    <span v-show="index !== player.anthology.value">P{{ index + 1 }}</span>
                  </v-list-item-icon>

                  <!-- 选集名字 -->
                  <v-list-item-content>
                    <v-list-item-title>{{ anthology.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
        选集
      </button>

      <!-- 发送弹幕输入框 -->
      <div
        class="mr-12"
        style="width:360px; min-width:360px;"
        v-show="customControls.footer.right.sendBarrage"
      >
        <div
          class="d-flex align-center"
          style="height:100%;"
        >
          <!-- 输入框 -->
          <v-text-field
            solo
            dark
            dense
            hide-details
            placeholder="来几条弹幕压压惊~"
            background-color="grey darken-4"
            append-outer-icon="mdi-send-circle"
            @click:append-outer="1"
          ></v-text-field>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import 'mui-player/dist/mui-player.min.css'
import MuiPlayer from 'mui-player'
// 使用模块管理器引入 PC 端的扩展插件
import MuiPlayerDesktopPlugin from 'mui-player-desktop-plugin'

export default {
  name: 'MuiPlayer',
  data () {
    return {
      // MuiPlayer 视频播放器的对象
      mp: null,
      // 播放器配置
      player: {
        // 倍速
        doubleSpeed: {
          // 倍速菜单的左、上位置
          top: 1000,
          left: 1000,
          // 倍速值
          value: 1,
          // 倍速列表
          list: [],
        },
        // 清晰度 
        clarity: {
          // 清晰度菜单的左、上位置
          top: 1000,
          left: 1000,
          // 值
          value: 1,
          // 清晰度列表
          list: []
        },
        // 选集
        anthology: {
          // 选集菜单的左、上位置
          top: 1000,
          left: 1000,
          // 值
          value: this.id - 1000,
          // 选集列表
          list: this.collection
        },
        // 弹幕设置
        barrageSetting: {
          // 弹幕设置菜单的左、上位置
          top: 1000,
          left: 1000,
        }
      },
      // 全屏
      fullScreen: {
        // 网页全屏
        page: false,
        // 窗口全屏
        window: false
      },
      // 自定义控件
      customControls: {
        // 底部控件
        footer: {
          // 底部控件的左侧
          left: {
            // 下一集控件是否显示
            nextMedia: this.nextMedia,
          },
          // 底部控件的右侧
          right: {
            // 发送弹幕输入框是否显示
            sendBarrage: false,
            // 弹幕设置控件是否显示
            barrageSetting: false,
            // 弹幕开关控件是否显示
            barrageOpenClose: false,
            // 选集控件是否显示
            anthology: {
              // 默认情况下是否全屏或者网页全屏
              show: false,
            },

          }
        }
      },
      // 弹幕
      barrage: {
        // 是否打开
        open: true,
        // 弹幕不透明度
        opacity: 1,
        /**
         * @0 小
         * @1 适中
         * @2 大
         */
        fontSize: 1,
        /**
         * @0 慢
         * @1 适中
         * @2 快
         */
        speed: 1,
        /**
         * @0.25 1/4
         * @0.5 半屏
         * @0.75 3/4
         * @1 满屏
         */
        area: 1,
      },
      // 视频播放器的配置
      config: {
        // 容器
        container: '#mui-player',
        // 标题
        title: this.title,
        // 视频地址
        src: '',
        // 视频的封面
        poster: this.poster,
        // PC端的扩展
        plugins: [
          new MuiPlayerDesktopPlugin({
            /**
             * 全屏时控件大小缩放比
             * 注：新版本的 MuiPlayer 无法设置缩放比为 1
             *     可以安装旧版本解决，这里直接采用无限接近 1 解决 
             */
            fullScaling: 1.001,
            // 自定义设置组
            customSetting: [
              {
                name: 'playbackRate', // 播放倍速
                show: false, // 不显示
              }
            ],
          })
        ],
        // 自定义播放器控件
        custom: {
          customLeftFooterControls: [
            {
              slot: 'nextMedia', // 对应定义的 slot 值
              position: 'right', // 显示的位置，可选 left、right
              tooltip: '下一集', // 鼠标悬浮在控件上显示的文字提示
              oftenShow: false, // 是否常显示。默认为false，在 mobile 环境下竖屏状态下隐藏，pc环境判下视频容器小于500px时隐藏
              click: function (e) { // 按钮点击事件回调

              },
              style: {}, // 自定义添加控件样式
            },
          ],
        },
      },
    }
  },
  props: {
    // 视频编号 
    id: {
      type: Number,
      required: true,
    },
    // 视频标题
    title: {
      type: String,
      required: true,
    },
    // 是否显示下一集控件
    nextMedia: {
      type: Boolean,
      defaulted: false,
    },
    // 合集
    collection: {
      type: Array,
      defaulted: null,
    },
    // 封面
    poster: {
      type: String,
      required: true,
    },
    // 播放的时间
    playTime: {
      type: Number,
      defaulted: 0,
    },
    // 弹幕数量
    barrageCount: {
      type: Number,
      defaulted: 0,
    }

  },
  watch: {
    // 监听清晰度发生变化
    'player.clarity.value' (newData) {
      // 关闭清晰度菜单
      this.showClarityMenu(false)

      // 视频播放器实例成功
      if (this.mp !== null) {
        // 获取视频播放的当前时间
        let currentTime = this.mp.video().currentTime

        // 所有的清晰度 --> 切换清晰度对应的视频地址
        let clarityArr = this.player.clarity.list
        clarityArr.some(item => {
          if (item.name === newData) {
            // 切换视频的地址
            this.mp.video().src = item.src
            // 让当前的视频的播放时间点设置为刚刚获取的时间点
            this.mp.video().currentTime = currentTime
            // 进行播放
            this.mp.video().play()

            // 显示消息提示框
            this.mp.showToast({
              message: `视频已切换至${newData}画质`,
              style: {
                position: 'absolute',
                left: '110px',
                height: '40px',
                lineHeight: '30px',
                borderRadius: '6px',
              }
            })

            return true
          }
        })

      }
    },
    // 监听倍速值是否发生变化
    'player.doubleSpeed.value' (newData) {
      // 隐藏倍速的菜单
      this.showDoubleSpeedMenu(false)

      // 调整视频的播放速度
      if (this.mp) {
        let video = this.mp.video()

        // 设置视频的播放速度
        video.playbackRate = newData
      }

    },
    // 是否全屏或者网页全屏
    fullScreen: {
      deep: true,
      handler (newData) {
        // 已进入网页全屏 或者 全屏播放
        if (newData.page || newData.window) {
          // 显示弹幕设置控件、弹幕开关控件、选集控件、弹幕输入框控件
          this.customControls.footer.right.barrageSetting = true
          this.customControls.footer.right.barrageOpenClose = true
          this.customControls.footer.right.anthology.show = true
          this.customControls.footer.right.sendBarrage = true
        } else {
          // 隐藏弹幕设置控件、弹幕开关控件、选集控件、弹幕输入框控件
          this.customControls.footer.right.barrageSetting = false
          this.customControls.footer.right.barrageOpenClose = false
          this.customControls.footer.right.anthology.show = false
          this.customControls.footer.right.sendBarrage = false
        }
      }
    }
  },
  methods: {
    // 弹幕不透明度的标签
    barrageOpacityLabel () {
      return (this.barrage.opacity * 100) + '%'
    },
    /**
     * 是否显示弹幕设置菜单
     * @isShow 是否显示
     */
    showBarrageSettingMenu (isShow) {
      if (isShow) {
        // 获取弹幕设置控件的元素
        let btn = this.$refs.barrageSettingBtn.getBoundingClientRect()

        // 获取弹幕设置菜单的元素
        let menu = this.$refs.barrageSettingMenu.$el.getBoundingClientRect()

        // 宽度差
        let widthDiff = btn.width - menu.width

        // 弹幕设置菜单左侧对齐
        this.player.barrageSetting.left = (widthDiff < 0 ? widthDiff : -widthDiff) / 2
        // 弹幕设置菜单上侧距离
        this.player.barrageSetting.top = -(menu.height + 14)

        // 隐藏倍速菜单
        this.showDoubleSpeedMenu(false)
        // 隐藏清晰度菜单
        this.showClarityMenu(false)
        // 隐藏选集菜单
        this.showAnthologyMenu(false)
      } else {
        // 弹幕设置菜单左侧对齐
        this.player.barrageSetting.left = 1000
        // 弹幕设置菜单上侧距离
        this.player.barrageSetting.top = 1000
      }
    },
    /**
     * 是否显示选集菜单
     * @isShow 是否显示
     */
    showAnthologyMenu (isShow) {
      if (isShow) {
        // 获取选集控件的元素
        let btn = this.$refs.anthologyBtn.getBoundingClientRect()

        // 获取选集菜单的元素
        let menu = this.$refs.anthologyMenu.$el.getBoundingClientRect()

        // 宽度差
        let widthDiff = btn.width - menu.width

        // 选集菜单左侧对齐
        this.player.anthology.left = (widthDiff < 0 ? widthDiff : -widthDiff) / 2
        // 选集菜单上侧距离
        this.player.anthology.top = -(menu.height + 14)

        // 隐藏倍速菜单
        this.showDoubleSpeedMenu(false)
        // 隐藏清晰度菜单
        this.showClarityMenu(false)
        // 隐藏弹幕设置
        this.showBarrageSettingMenu(false)
      } else {
        // 选集菜单左侧对齐
        this.player.anthology.left = 1000
        // 选集菜单上侧距离
        this.player.anthology.top = 1000
      }
    },
    /**
     * 是否显示清晰度菜单
     * @isShow 是否显示
     */
    showClarityMenu (isShow) {
      if (isShow) {
        // 获取清晰度控件的元素
        let btn = this.$refs.clarityBtn.getBoundingClientRect()

        // 获取清晰度菜单的元素
        let menu = this.$refs.clarityMenu.$el.getBoundingClientRect()

        // 宽度差
        let widthDiff = btn.width - menu.width

        // 清晰度菜单左侧对齐
        this.player.clarity.left = (widthDiff < 0 ? widthDiff : -widthDiff) / 2
        // 清晰度菜单上侧距离
        this.player.clarity.top = -(menu.height + 14)

        // 隐藏倍速菜单
        this.showDoubleSpeedMenu(false)
        // 隐藏选集菜单
        this.showAnthologyMenu(false)
        // 隐藏弹幕设置
        this.showBarrageSettingMenu(false)
      } else {
        // 清晰度菜单左侧对齐
        this.player.clarity.left = 1000
        // 清晰度菜单上侧距离
        this.player.clarity.top = 1000
      }
    },
    /**
     * 是否显示倍速菜单
     * @isShow 是否显示
     */
    showDoubleSpeedMenu (isShow) {
      if (isShow) {
        // 获取倍速控件的元素
        let btn = this.$refs.doubleSpeedBtn.getBoundingClientRect()

        // 获取倍速菜单的元素
        let menu = this.$refs.doubleSpeedMenu.$el.getBoundingClientRect()

        // 宽度差
        let widthDiff = btn.width - menu.width

        // 倍速菜单左侧对齐
        this.player.doubleSpeed.left = (widthDiff < 0 ? widthDiff : -widthDiff) / 2
        // 倍速菜单上侧距离
        this.player.doubleSpeed.top = -(menu.height + 14)

        // 隐藏清晰度菜单
        this.showClarityMenu(false)
        // 隐藏选集菜单
        this.showAnthologyMenu(false)
        // 隐藏弹幕设置
        this.showBarrageSettingMenu(false)
      } else {
        // 倍速菜单左侧对齐
        this.player.doubleSpeed.left = 1000
        // 倍速菜单上侧距离
        this.player.doubleSpeed.top = 1000
      }
    },
    // 隐藏所有自定义的菜单
    hideCustomControls () {
      this.showDoubleSpeedMenu(false) // 清晰度菜单
      this.showClarityMenu(false) // 倍速菜单
      this.showAnthologyMenu(false) // 选集菜单
      this.showBarrageSettingMenu(false) // 弹幕设置
    },
    // 获取播放器的清晰度列表
    getVideoClarity () {
      // 请求服务器 --> 获取播放器的清晰度列表
      let clarityArr = [{ id: 1, name: '原画', src: 'http://v.itheima.com/20天学会java/01、Java课程简介.mp4', defaulted: false }, { id: 2, name: '1080P 超清', src: 'http://v.itheima.com/20天学会java/02、Java语言概述.mp4', defaulted: true }, { id: 3, name: '720P 高清', src: 'http://v.itheima.com/20天学会java/03、Java开发环境搭建：JDK安装、常用命令行命令.mp4', defaulted: false }, { id: 4, name: '460P 标清', src: 'http://v.itheima.com/20天学会java/04、Java入门程序：HelloWorld.mp4', defaulted: false }, { id: 5, name: '360P 流畅', src: 'http://v.itheima.com/20天学会java/05、Java入门程序：常见问题.mp4', defaulted: false }]

      // 查找哪个清晰度是默认值 --> 播放该清晰度的视频
      clarityArr.forEach(item => {
        if (item.defaulted) {
          // 设置清晰度的值
          this.player.clarity.value = item.name

          // 设置视频地址
          this.config.src = item.src

          return true
        }
      })

      this.player.clarity.list = [{ id: 1, name: '原画', src: 'http://v.itheima.com/20天学会java/01、Java课程简介.mp4', defaulted: false }, { id: 2, name: '1080P 超清', src: 'http://v.itheima.com/20天学会java/02、Java语言概述.mp4', defaulted: true }, { id: 3, name: '720P 高清', src: 'http://v.itheima.com/20天学会java/03、Java开发环境搭建：JDK安装、常用命令行命令.mp4', defaulted: false }, { id: 4, name: '460P 标清', src: 'http://v.itheima.com/20天学会java/04、Java入门程序：HelloWorld.mp4', defaulted: false }, { id: 5, name: '360P 流畅', src: 'http://v.itheima.com/20天学会java/05、Java入门程序：常见问题.mp4', defaulted: false }]

    },
    // 获取播放器的倍速列表
    getVideoDoubleSpeeds () {
      // 请求服务器 --> 获取播放器的倍速列表
      this.player.doubleSpeed.list = [{ id: 1, speed: 0.5, text: '0.5x' }, { id: 2, speed: 0.75, text: '0.75x' }, { id: 3, speed: 1, text: '1x' }, { id: 4, speed: 1.5, text: '1.5x' }, { id: 5, speed: 2, text: '2x' },]
    },
    // 向视频播放器中添加自定义的底部右侧控件(弹幕设置、弹幕开关、倍速、清晰度、选集、发送弹幕)
    addCustomRightFooterControls () {
      // 获取视频播放器底部右侧的控件容器
      let leftPartElem = document.getElementById('right-part')

      // 获取自定义右侧底部控件的所有节点元素
      let childNodes = document.getElementById('customRightFooterControls').childNodes

      while (childNodes.length !== 0) {
        leftPartElem.prepend(childNodes[0])
      }

    },
    // 向视频播放器中添加自定义的底部左侧控件(下一集)
    addCustomLeftFooterControls () {
      // 获取视频播放器底部左侧的控件容器
      let leftPartElem = document.getElementById('left-part')

      // 获取视频播放器底部左侧的时间控件
      let timeNode = leftPartElem.childNodes[1]

      // 自定义的下一集节点
      let nextMediaNode = document.getElementById('nextMedia')

      // 把自定义的下一集控件添加到到底部左侧的时间控件前
      leftPartElem.insertBefore(nextMediaNode, timeNode)
    }
  },
  mounted () {
    // 初始化 MuiPlayer 插件
    let mpr = new MuiPlayer(this.config)

    // 监听播放器已创建完成
    mpr.on('ready', event => {
      this.mp = mpr

      // 向视频播放器中添加自定义的底部左侧控件(下一集)
      this.addCustomLeftFooterControls()

      // 向视频播放器中添加自定义的底部右侧控件(弹幕设置、弹幕开关、倍速、清晰度、选集、发送弹幕)
      this.addCustomRightFooterControls()

      // 获取所有的控件
      Array.from(this.mp.getControls()).forEach((ele, index) => {
        if ([4, 5, 6, 7, 8, 9].indexOf(index) !== -1) {
          // 播放、音量、画中画、设置、网页全屏、全屏 ==> 鼠标悬浮事件
          ele.onmouseover = () => {
            // 隐藏所有自定义的菜单
            this.hideCustomControls()
          }
        }
      })

      // 下一集控件监听鼠标是否悬浮
      document.querySelector('#nextMedia').onmouseover = () => {
        // 隐藏所有自定义的菜单
        this.hideCustomControls()
      }

      // 视频播放器容器监听鼠标移出事件
      document.querySelector('#MuiPlayer').onmouseleave = () => {
        // 隐藏所有自定义的菜单
        this.hideCustomControls()
      }

      // 控制台显示与隐藏的切换
      this.mp.on('controls-toggle', (data) => {
        if (!data.show) {
          // 隐藏所有自定义的菜单
          this.hideCustomControls()
        }
      })

      // 监听是否为网页全屏播放
      this.mp.on('pagefull-change', (data) => {
        if (data.pagefull) {
          this.fullScreen.page = true
          this.fullScreen.window = false
        } else {
          this.fullScreen.page = false
        }
      })

      // 监听是否全屏
      this.mp.on('fullscreen-change', (data) => {
        if (data.fullscreen) {
          this.fullScreen.window = true
          this.fullScreen.page = false
        } else {
          this.fullScreen.window = false
        }
      })
    });

  },
  created () {
    // 获取播放器的倍速列表
    this.getVideoDoubleSpeeds()

    // 获取播放器的清晰度列表
    this.getVideoClarity()
  }
}
</script>

<style lang='less' scoped>
.overflow-player::-webkit-scrollbar {
  width: 6px;
  background-color: rgb(117, 117, 117);
  border-radius: 5px;
}

.overflow-player::-webkit-scrollbar-thumb {
  background-color: rgb(58, 58, 58);
  border-radius: 5px;
}
</style>

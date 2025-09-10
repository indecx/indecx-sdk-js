<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <strong>Ready to create an app?</strong>
        <p>Start with Ionic <a target="_blank" rel="noopener noreferrer"
            href="https://ionicframework.com/docs/components">UI Components</a></p>

            <ion-button @click="generateLink">Generate Link</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
import indecx from 'indecx-sdk-js';
import { onMounted } from 'vue';


onMounted(() => {
  
  indecx.init({
    companyId: "5d8ba15696fa442270173557",
    actionId: "KKLW5YSY",
    companyKey: "$dddd98shBLV4CJAYKSTk890ujCVj.dM4H3lHweerrjoRt3npXGxcgfddja1mcsdf",
  });

});

const generateLink = async () => {
  const link = await indecx.generateLink({
    email: 'usuario@example.com'
  })

  indecx.showModal(link, {
    title: 'Pesquisa de satisfação',
    width: '100%',
    height: '100%'
  });
}

</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>

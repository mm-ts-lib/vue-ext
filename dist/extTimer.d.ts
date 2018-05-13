import Vue from 'vue';
declare module 'vue/types/vue' {
    interface Vue {
        $timerCounter: number;
    }
}
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        timerInterval?: number;
        onTimer?: Function;
    }
}

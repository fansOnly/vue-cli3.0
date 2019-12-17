export default {
    created() {
        this.percent = Math.floor(Math.random() * 30);
    },
    mounted() {
        this.percent = Math.floor(Math.random() * (100 - this.percent));
        setTimeout(() => {
            this.percent = 100;
        }, 2000)
        setTimeout(() => {
            this.progress = false;
            this.percent = 0;
        }, 4000)
    }
}
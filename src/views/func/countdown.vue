<template>
    <div class="container">
        <a-row :gutter="16">
            <a-col :span="12">
                <a-statistic-countdown
                    title="Countdown"
                    :value="deadline"
                    @finish="onFinish"
                />
            </a-col>
            <a-col :span="12">
                <a-statistic-countdown
                    title="Million Seconds"
                    :value="deadline"
                    format="HH:mm:ss:SSS"
                />
            </a-col>
            <a-col :span="24" style="margin-top: 32px;">
                <a-statistic-countdown
                    title="Day Level"
                    :value="deadline"
                    format="D 天 H 时 m 分 s 秒"
                />
            </a-col>
        </a-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30
        };
    },
    methods: {
        onFinish() {
            console.log('over');
        }
    }
};
</script>

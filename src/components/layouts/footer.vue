<template>
    <div class="copyright">
        Copyright
        <a-icon type='copyright' style="padding:0 8px;" />
        {{$t('GLOBAL.COPYRIGHT')}}
    </div>
</template>
<script>
export default {
    name: 'Footer',
}
</script>
<style scoped>
    .copyright {
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(0, 0, 0, 0.45);
        line-height: 4;
    }
</style>
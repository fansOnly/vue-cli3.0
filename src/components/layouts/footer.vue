<template>
    <div class="footer">
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
    .footer {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
<template>
    <article class="zmui-list" :class="classes">
        <slot></slot>
    </article>
</template>

<script type="text/babel">
    export default {
        name: 'list',
        props: {
            theme: {
                validator(value){
                    return ['1', '2', '3', '4', '5'].indexOf(value + '') > -1;
                },
                default: '1'
            }
        },
        computed: {
            classes() {
                return 'zmui-list-theme' + this.theme;
            }
        }
    }
</script>

<style lang="less">
    @import '../../../styles/widget/list/index.less';
</style>

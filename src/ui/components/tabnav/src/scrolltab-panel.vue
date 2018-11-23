<template>
    <div class="zmui-scrolltab-content-item">
        <strong class="zmui-scrolltab-content-title">{{label}}</strong>
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'scrolltab-panel',
        props: {
            label: String,
            icon: String,
            active: Boolean
        },
        mounted() {
            this.$parent.addItem({label: this.label, icon: this.icon, _uid: this._uid});
        }
    }
</script>

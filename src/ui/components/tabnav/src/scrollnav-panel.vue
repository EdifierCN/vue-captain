<template>
    <div>
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'scrollnav-panel',
        props: {
            label: String
        },
        mounted() {
            this.$parent.addItem({label: this.label, _uid: this._uid});
        }
    }
</script>

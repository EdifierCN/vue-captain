<template>
    <router-link :to="href" class="zmui-list-item" v-if="type == 'link'">
        <div class="zmui-list-img">
            <slot name="img"></slot>
        </div>
        <div class="zmui-list-mes">
            <div class="zmui-list-title">
                <slot name="title"></slot>
            </div>
            <slot name="other"></slot>
        </div>
    </router-link>
    <a :href="href || 'javascript:;'" class="zmui-list-item" v-else-if="type == 'a'">
        <div class="zmui-list-img">
            <slot name="img"></slot>
        </div>
        <div class="zmui-list-mes">
            <div class="zmui-list-title">
                <slot name="title"></slot>
            </div>
            <slot name="other"></slot>
        </div>
    </a>
    <div class="zmui-list-item" v-else>
        <div class="zmui-list-img">
            <slot name="img"></slot>
        </div>
        <div class="zmui-list-mes">
            <div class="zmui-list-title">
                <slot name="title"></slot>
            </div>
            <slot name="other"></slot>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'list-item',
        props: {
            type: {
                type: String,
                validator (value) {
                    return ['link', 'a', 'div'].indexOf(value) > -1;
                },
                default: 'a'
            },
            href: [String, Object]
        }
    }
</script>

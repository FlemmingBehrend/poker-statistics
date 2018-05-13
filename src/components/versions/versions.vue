<template>
    <div style="color: green">
        <span data-toggle="modal" data-target="#exampleModal">{{currentVersion}}</span>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Versioner</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" v-for="version in versions">
                        <div class="version-header">{{version.name}}</div>
                        <div v-html="converter.makeHtml(version.body)"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Luk</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import showdown from "showdown";
    let converter;
    export default {
        props: ["current-version", "versions"],
        created() {
            this.converter = new showdown.Converter();
            this.converter.setFlavor('github');
        }
    }
</script>

<style scoped>
    .version-header {
        font-size: larger;
        font-weight: bold;
        background-color: aquamarine;
        padding-bottom: 4px;
        padding-right: 6px;
        margin-bottom: 10px;
        text-align: end;
    }
    h1 {
        color: red !important;
    }
</style>

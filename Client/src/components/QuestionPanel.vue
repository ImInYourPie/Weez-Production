<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8">
                <div class="columns">
                    <div class="column is-12">
                        <a class="nav-link">{{question.title}}</a>
                        
                    </div>
                    <div class="column is-6">
                            <b-tag>Javascript</b-tag>
                        </div>
                    <div class="columns">
                        <div class="column is-6">
                            <h1 class="subtitle is-size-6"></h1>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-4">
                <div class="columns has-text-centered">
                    <div class="column is-4">
                        <div class="vote-box">
                            <span class="subtitle is-size-5">{{question.upVotes}}</span>
                            <p class="subtitle is-size-7">Upvotes</p>
                        </div>
                    </div>
                    <div class="column is-4">
                        <div class="vote-box">
                            <span class="subtitle is-size-5">{{question.downVotes}}</span>
                            <p class="subtitle is-size-7">Downvotes</p>
                        </div>
                    </div>
                    <div class="column is-4">
                        <div class="vote-box">
                            <span class="subtitle is-size-5">0</span>
                            <p class="subtitle is-size-7">Respostas</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>


<script>
    export default {
        data(){
            return {
            }
        },
        props: [
            "question"
            ]
    }
</script>

<style lang="scss" scoped>
.box{
    margin-bottom: 5px;
}
    .vote-box{
        background-color: whitesmoke;
        padding-top: 5px;
        padding-bottom: 5px;
        border: solid transparent;
        border-radius: 4px;
    }
    /*.question-box{*/
    /*    background-color: whitesmoke;*/
    /*    padding: 5px;*/
    /*}*/
</style>
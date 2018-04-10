<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group id="exampleInputGroup2"
                          label="Your Name:"
                          label-for="exampleInput2">
                <b-form-input id="exampleInput2"
                              type="text"
                              v-model="form.name"
                              required
                              placeholder="Enter name">
                </b-form-input>
            </b-form-group>
        </b-form>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>

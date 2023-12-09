<script>
import axios from 'axios';
export default {
    props: [],
    data() {
        return {
            meetings: [],
            errors: [],
            formDetails: {
                name: "",
                description: "",
                duration: 15,
                isRepeat: false,
                pattern: "None",
            },
            scheduledTime: new Date()
        }
    },
    methods: {
        resetForm() {
            this.formDetails = {
                ...{
                    name: "",
                    description: "",
                    duration: 15,
                    isRepeat: false,
                    pattern: "None",
                }
            }
        },
        async getDetails() {
            try {
                const { data } = await axios.post("/api/meetings", { scheduledTime: this.scheduledTime });
                this.meetings = data;
            } catch (error) {
                console.log("ERR:::", error)
            }
        },
        async saveDetails() {
            this.errors = [];
            const reqFields = ["name", "description", "duration"];
            reqFields.forEach(element => {
                if (!this.formDetails[element]) {
                    this.errors.push(`${element} field is missing`);
                }
            });
            this.formDetails.scheduledTime = this.scheduledTime;
            if (this.errors.length > 0) return;
            try {
                const res = await axios.post("/api/meeting", this.formDetails);
                this.getDetails();
            } catch (error) {
                console.log("ERR:::", err)
                this.errors.push(err)
            }
        }
    },
    created() {
        this.getDetails();
    },
    watch: {
        scheduledTime: {
            async handler(newVal, oldVal) {
                this.getDetails();
            }
        }
    }
}
</script>
<template>
    <div class="flex justify-around my-8">
        <div class="w-2/5 px-4 py-4 rounded-lg bg-white h-[90vh]">
            <div>
                <V-Calender expanded transparent borderless mode="dateTime" :min-date="new Date()" v-model="scheduledTime"
                    :selectAttribute="{ event: dateChanged }" />
            </div>
            <h2>List Meetings</h2>
            <div class="h-64 overflow-auto">
                <div v-for="item of meetings" :key="item">
                    <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 ">
                    <div class="divide-x-2 divide-blue-300 flex mx-2">
                        <p class="inline mx-2">{{ new Date(item.scheduledTime).toLocaleTimeString(region, {
                            hour: 'numeric', minute: '2-digit',
                            hour12: true
                        }) }}</p>
                        <p class="px-4 mx-2">{{ item.name }} <small>{{ item.isRepeat ? item.pattern : "Today only"
                        }}</small></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-2/5 px-4 py-4 rounded-lg bg-white h-[90vh]">
            <h2>Schedule Meeting</h2>
            <div class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                v-if="this.errors.length > 0" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div>
                    <span class="font-medium">Alert!</span> {{ this.errors.length > 0 ? this.errors[0] : "" }}
                </div>
            </div>
            <form class="max-w-md mx-auto">
                <div class="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_text" id="floating_text" v-model="formDetails.name"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " required />
                    <label for="floating_text"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Heading</label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <textarea name="floating_password" id="floating_password" v-model="formDetails.description"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " required />
                    <label for="floating_password"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>

                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-5 group">
                        <label for="countries"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
                        <select id="duration" v-model="formDetails.duration"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 form-field focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected disabled value="0">--none--</option>
                            <option value="15">15 mins</option>
                            <option value="30">30 mins</option>
                            <option value="45">45 min</option>
                        </select>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-5 group">
                        <input checked id="checkbox-1" type="checkbox" v-model="formDetails.isRepeat"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Repeat
                            this meeting</label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group" v-if="formDetails.isRepeat">
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                            pattern</label>
                        <select id="countries" v-model="formDetails.pattern"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected disabled value="None">--none--</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                </div>
                <input type="button" @click="saveDetails()"
                    class=" btn btn-primary text-white bg-blue-700 mx-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    value="Submit" />
                <a @click="resetForm()" target="_blank" rel="noopener noreferrer">Cancel</a>
            </form>
        </div>
    </div>
</template>
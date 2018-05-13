import {VERSIONS_LOAD} from "../actions";
import fetch from "node-fetch";

const state = {
    versions: []
};

const getters = {
    currentVersion: state => {
        return state.versions
            .slice()
            .sort((a, b) => a.tag.localeCompare(b.tag))
            .pop();
    },
    versions: state => {
        return state.versions;
    }
};

const mutations = {
    addVersions(state, payload) {
        state.versions = payload;
    }
};

const actions = {
    [VERSIONS_LOAD]({commit}) {
        return new Promise((resolve, reject) => {
            fetch('https://api.github.com/rate_limit')
                .then(res => res.json())
                .then(res => {
                    let remaining = res.resources.core.remaining;
                    console.info('Remaining github calls ', remaining);
                    if (remaining < 10) {
                        console.log('We are almost blocked by github, do not update the state');
                        resolve();
                    } else {
                        console.log('Fetch data from github');
                        fetch('https://api.github.com/repos/FlemmingBehrend/poker-statistics/releases')
                            .then(res => res.json())
                            .then(json => {
                                const data = [];
                                for (const release of json) {
                                    data.push({
                                        tag: release["tag_name"],
                                        name: release["name"],
                                        body: release["body"]
                                    });
                                }
                                return data;
                            })
                            .then(payload => {
                                commit('addVersions', payload);
                                resolve();
                            })
                            .catch(err => {
                                console.log('Error loading releases from github', err);
                                reject();
                            });
                    }
                });
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};

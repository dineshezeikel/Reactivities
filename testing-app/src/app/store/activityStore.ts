import { observable, action, computed, configure, runInAction } from 'mobx'
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../model/Activity';
import agent from '../api/agent'


configure({ enforceActions: 'always' })

class ActivityStore {

    @observable activitiesRegistry = new Map();
    @observable initialLoading = false;
    @observable selectedActivity: IActivity | null = null;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = "";



    @action loadActivities = async () => {
        this.initialLoading = true;

        try {
            const activities = await agent.Activities.list();

            runInAction('Loading Activities', () => {
                activities.forEach((_activity) => {
                    _activity.date = _activity.date.split(".")[0];
                    this.activitiesRegistry.set(_activity.id, _activity);
                });
                this.initialLoading = false;
            });

        }
        catch (error) {
            console.log(error);
            runInAction('Error loading activities', () => {
                this.initialLoading = false;
            });

        }
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activitiesRegistry.get(id);
        this.editMode = false;
    }

    @action setEditMode = (editMode: boolean) => {
        this.editMode = editMode;
    }

    @action setSelectedActivty = (activity: IActivity | null) => {
        this.selectedActivity = activity;
    }

    @action openCreateForm = () => {
        this.selectedActivity = null;
        this.editMode = true;
    }

    @action CreateActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {

            await agent.Activities.create(activity);

            runInAction('Creating Activity', () => {
                this.activitiesRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.submitting = false;
            });

        } catch (error) {
            console.log(error);
            runInAction('Error creating activity', () => {
                this.submitting = false;
            });


        }
    }

    @action UpdateActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity, activity.id);

            runInAction('Editing Activity', () => {
                this.activitiesRegistry.set(activity.id, activity);

                this.selectedActivity = activity;
                this.editMode = false;
                this.submitting = false;
            })

        } catch (error) {
            console.log(error);
            runInAction('Error editing activity', () => {
                this.submitting = false;
            })

        }
    }

    @action DeleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(id);

            runInAction('Deleting Activity', () => {
                this.activitiesRegistry.delete(id);
                this.submitting = false;
                this.target = "";
            });

        } catch (error) {
            console.log(error);
            runInAction('Error deleting activity', () => {
                this.submitting = false;
                this.target = "";
            });


        }
    }

    @computed get SortActivityByDate(): IActivity[] {
        return Array.from(this.activitiesRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            console.log("From cache");
            this.selectedActivity = activity;
        } else {
            this.initialLoading = true;
            try {
                console.log("From API");
                let activity = await agent.Activities.details(id);
                runInAction('Loading activity w.r.t id', () => {
                    this.selectedActivity = activity;
                    this.initialLoading = false;
                });

            } catch (error) {
                console.log(error);
                runInAction('Error loading activity w.r.t id', () => {
                    this.initialLoading = false;
                });
            }
        }
    }

    getActivity = (id: string) => {
        return this.activitiesRegistry.get(id);
    }

    @action ClearActivity = () => {
        this.selectedActivity = null;
    }
}


export default createContext(new ActivityStore());

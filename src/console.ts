import Context from "./context";
import Mission from "./models/mission/mission";
import Task from "./models/task/task";
import User from "./models/user/user";
import MissionRepository from "./repositories/missionRepository";
import TaskRepository from "./repositories/taskRepository";
import UserRepository from "./repositories/userRepository";
import ItemRepository from "./repositories/itemRepository";
import ConfigBuilder from "./session/configBuilder";
import SessionManager from "./session/sessionManager";
import { stringify } from "querystring";
import Annotation from "./models/annotation/annotation";
import StorageRepository from "./repositories/storageRepository";
import Storage from "./models/storage/storage";
import AchievementRepository from "./repositories/achievementRepository";
import Achievement from "./models/achievement/achievement";


async function test() {
        
    const backendUrl = "http://funcrowd-staging.herokuapp.com";
    //const backendUrl = "http://192.168.0.32:8888";

    let sessionManager: SessionManager = new SessionManager(
        backendUrl,
        new ConfigBuilder()
    );

    let context = new Context(sessionManager);

    let userRepository: UserRepository = context.repositories.users;


    console.log("1. Testing UserRepository");
    console.log("1.1. Testing login");

    try {
        let user: User = await userRepository.login("admin@admin.pl", "Wojtek1234");
        context.sessionManager.setupUser(user);
        console.log(user);
    } catch(error) {
        console.log(error);
        return;
    }


    console.log("1.2. Testing getCurrentUserDetails");
    let userDetails: User = await userRepository.getCurrentUserDetails();
    console.log(userDetails);


    console.log("2. Testing MissionRepository");
    console.log("2.1. Testing list");


    let missionRepository: MissionRepository = context.repositories.missions;
    let missions: Mission[] = await missionRepository.list();
    missions.map((mission) => {
        console.log(mission);
    });

    console.log("2.2. Testing get - success");
    let mission = await missionRepository.get(missions[0].id);
    console.log(mission);

    console.log("2.3. Testing get - fail");
    try {
        await missionRepository.get(0);
    } catch (error) {
        console.log("Status: " + error.response.status);
        console.log(error.response.data);
    }

    console.log("3. Testing TaskRepository");
    console.log("3.1. Testing list");
    let taskRepository: TaskRepository = context.repositories.tasks;
    
    let tasks: Task[] = await taskRepository.list(mission.id);
    tasks.map((task) => {
        console.log(task)
    });

    console.log("3.2. Testing get - success");
    let task = await taskRepository.get(tasks[0].id);
    console.log(task);


    console.log("4. ItemRepository");
    console.log("4.1. Testing nextItem");
    let itemRepository: ItemRepository = context.repositories.items;
    let item = await itemRepository.nextItem(task.id);
    console.log(item);
    console.log("fields:")
    item.template.fields.map((field) => console.log(field));

    let annotation = new Annotation(item);
    let outputField = item.outputFields[0];
    if (outputField.source != null)
         annotation.addOutput(outputField.name, outputField.source.value[0]);
    console.log(annotation);
    console.log("4.2. Testing postAnnotation");
    
    /*
    let annotationResponse = await itemRepository.postAnnotation(
        item.id,
        annotation
    );
    console.log(annotationResponse);
    console.log(annotationResponse.feedback.getScore('output'));
    */

    console.log("5. Testing StorageRepository");
    let storageRepository: StorageRepository = context.repositories.storages;
        
    console.log("5.1. Testing post");
    let newStorage: Storage = await storageRepository.post(
        "test", {"data": "test"});
    console.log(newStorage);

    console.log("5.2. Testing get");
    let storage: Storage = await storageRepository.get("test");
    console.log(storage);

    console.log("5.3. Testing post");
    let newStorages: Storage[] = await storageRepository.postBatch([
        {"key": "test2", "data": "test2"},
        {"key": "test3", "data": "test3"},
    ]);
    console.log(newStorages);

    console.log("5.4. Testing list");
    let storages: Storage[] = await storageRepository.list();
    storages.map((storage) => {
        console.log(storage);
    });


    console.log("6. Testing AchievementsRepository");
    let achievementRepository: AchievementRepository = context.repositories.achievements;

    console.log("6.1. Testing list");
    let achievements: Achievement[] = await achievementRepository.list();
    achievements.map((achievement) => {
        console.log(achievement);
    });

    console.log("6.2. Testing listMission");
    let missionAchievements: Achievement[] = await achievementRepository.listMission(mission.id);
    missionAchievements.map((achievement) => {
        console.log(achievement);
    });

    console.log("6.3. Testing listTask");
    let taskAchievements: Achievement[] = await achievementRepository.listTask(task.id);
    taskAchievements.map((achievement) => {
        console.log(achievement);
    });

    console.log("6.4. Testing listUnclosed");
    let unclosedAchievements: Achievement[] = await achievementRepository.listUnclosed();
    unclosedAchievements.map((achievement) => {
        console.log(achievement);
    });

}

test();

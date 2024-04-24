'use strict';
function Device(name, isActive) {
    this._name = name;
    this._isActive = isActive;
    if(this._isActive === undefined) {
        this._isActive = false;
    }
}

Device.prototype.getName = function () {
    return this._name;
};

Device.prototype.setName = function (newName) {
    if (typeof newName === 'string') {
        this._name = newName;
    }
};

Device.prototype.getStatus = function () {
    return this._isActive;
};

Device.prototype.turnOn = function () {
    if (this.getStatus() === true) {
        console.log("Device " + this._name + " already turned on.");
        return false;
    }
    this._isActive = true;
    console.log("Device " + this._name + " turned on.");
    return true;
};

Device.prototype.turnOff = function () {
    if (this.getStatus() === false) {
        console.log("Device " + this._name + " already turned off.");
        return false;
    }
    this._isActive = false;
    console.log("Device " + this._name + " turned off.");
    return true;
};

Device.prototype.timer = function (callback, duration) {
    if (this._isActive === false) {
        this.turnOn();
    }
    setTimeout(function() {
        callback(); 
    }, duration);
};


function Lamp(name, isActive, brightness) {
    Device.call(this, name, isActive);
    this.__brightness = 1;
    if (typeof brightness === 'number' && brightness > 0 && brightness < 7) {
        this.__brightness = brightness;
    }
}

Lamp.prototype = Object.create(Device.prototype);
Lamp.prototype.constructor = Lamp;

Lamp.prototype.getBrightness = function() {
    return this.__brightness;
};

Lamp.prototype.setBrightness = function(newBrightness) {
    if (typeof newBrightness !== 'number' || newBrightness < 1 || newBrightness > 6) {
        console.log("Brightness cannot be updated to level " + newBrightness);
        return false;
    }
    this.__brightness = newBrightness;
    console.log("Brightness updated to level " + newBrightness);
    return true;
};

Lamp.prototype.increaseBrightnessBy1 = function() {
    if (this.__brightness === 6) {
        console.log("Reached the maximum level of brightness.");
        return false;
    }
    this.setBrightness(this.__brightness + 1);
};

Lamp.prototype.decreaseBrightnessBy1 = function() {
    if (this.__brightness === 1) {
        console.log("Reached the minimum level of brightness.");
        return false;
    }
    this.setBrightness(this.__brightness - 1);
};

Lamp.prototype.getInfo = function () {
    var status;
    if (this._isActive === true) {
        status = 'Turned on';
    } else {
        status = 'Turned off';
    }
    var info = '\nLamp name - ' + this._name;
    info += '\nLamp status - ' + status;
    if (this._isActive == true) {
        info += '\nBrightness - ' + this.__brightness;
    }
    return info;
};


function AirConditioner(name, isActive, temperature) {
    Device.call(this, name, isActive);
    this.__temperature = 21;
    if (typeof temperature === 'number' && temperature < 31 && temperature > 15) {
        this.__temperature = temperature;
    }
}

AirConditioner.prototype = Object.create(Device.prototype);
AirConditioner.prototype.constructor = AirConditioner;

AirConditioner.prototype.getTemperature = function () {
    return this.__temperature;
};

AirConditioner.prototype.setTemperature = function(newTemprature) {
    if (typeof newTemprature === 'number' && newTemprature < 31 && newTemprature > 15) {
        this.__temperature = newTemprature;
        console.log("Temperature is updated to " + newTemprature);
        return true;
    }
    console.log("Pick temperature from 16 to 30.");
    return false;
};

AirConditioner.prototype.increaseTemperatureBy1 = function() {
    if (this.__temperature == 30) {
        console.log("Reached the maximum temperature.");
        return false;
    }
    this.setTemperature(this.__temperature + 1);
}

AirConditioner.prototype.decreaseTemperatureBy1 = function() {
    if (this.__temperature == 16) {
        console.log("Reached the minimum level of temperature.");
        return false;
    }
    this.setTemperature(this.__temperature - 1);
}

AirConditioner.prototype.getInfo = function () {
    var status;
    if (this._isActive === true) {
        status = 'Turned on';
    } else {
        status = 'Turned off';
    }
    var info = '\nAir Conditioner name - ' + this._name;
    info += '\nAir Conditioner status - ' + status;
    if (this._isActive == true) {
        info += '\nAir Conditioner - ' + this.__temperature;
    }
    return info;
};


function TV(name, isActive, channel, volume) {
    Device.call(this, name, isActive);
    this.__channel = 1;
    this.__volume = 9;
    if (typeof channel === 'number' && channel > 0 && channel < 101) {
        this.__channel = channel;
    }
    if (typeof volume === 'number' && volume > 0 && volume < 101) {
        this.__volume = volume;
    }
}

TV.prototype = Object.create(Device.prototype);
TV.prototype.constructor = TV;

TV.prototype.getChannel = function () {
    return this.__channel;
};

TV.prototype.getVolume = function () {
    return this.__volume;
};

TV.prototype.setChannel = function(otherChannel) {
    if (typeof otherChannel === 'number' && otherChannel > 0 && otherChannel < 101) {
        this.__channel = otherChannel;
        console.log("Currently playing channel number " + otherChannel);
        return true;
    }
    console.log("Please, pick the channel from 1 to 100.");
    return false;
};

TV.prototype.nextChannel = function() {
    if (this.__channel === 100) {
        return this.setChannel(1);
    }
    return this.setChannel(this.__channel + 1);
};

TV.prototype.previousChannel = function() {
    if (this.__channel === 1) {
        return this.setChannel(100);
    }
    return this.setChannel(this.__channel - 1);
};

TV.prototype.setVolume = function (newVolume) {
    if (typeof newVolume === 'number' && newVolume >= 0 && newVolume < 101) {
        this.__volume = newVolume;
        console.log("Volume updated to " + newVolume);
        return true;
    }
    console.log("Pick volume from 0 to 100.");
    return false;
};

TV.prototype.increaseVolumeBy1 = function() {
    return this.setVolume(this.__volume + 1);
}

TV.prototype.decreaseVolumeBy1 = function() {
    return this.setVolume(this.__volume - 1);
}

TV.prototype.__generateRandomNumber = function(maxLimit) {
    var num = Math.random() * maxLimit;
    num = Math.floor(num);
    return num;
}

TV.prototype.setRandomChannel = function() {
    var randomChannel = this.__generateRandomNumber(100);
    this.setChannel(randomChannel);
}

TV.prototype.getInfo = function () {
    var status;
    if (this._isActive === true) {
        status = 'Turned on';
    } else {
        status = 'Turned off';
    }
    var info = '\nTV name - ' + this._name;
    info += '\nTV status - ' + status;
    if (this._isActive == true) {
        info += '\nTV channel - ' + this.__channel;
        info += '\nTV volume - ' + this.__volume;
    }
    return info;
};


function Room(name) {
    this.__name = name;
    this.__devices = [];
}

Room.prototype.getName = function () {
    return this.__name;
}

Room.prototype.getDevices = function () {
    return this.__devices;
}

Room.prototype.setName = function (newName) {
    if (typeof newName === 'string') {
        console.log("Name updated to " + newName);
        this.__name = newName;
    }
}

Room.prototype.getDeviceByName = function(deviceName) {
    for (var i = 0; i < this.__devices.length; i++) {
        if (this.__devices[i].getName() === deviceName) {
            return this.__devices[i];
        }
    }
    return null;
};

Room.prototype.addDevice = function (device) {
    if (this.getDeviceByName(device.getName()) !== null) {
        console.log("Device with name " + device.getName() + " already exists in room " + this.__name);
        return false;
    }
    this.__devices.push(device);
    console.log("Device " + device.getName() + " added successfully to room " + this.__name);
    return true;
}

Room.prototype.__deleteDevice = function (device) {
    for (var i = 0; i < this.__devices.length; i++) {
        if (this.__devices[i].getName() === device.getName()) {
            this.__devices.splice(i, 1);
            break;
        }
    }
}

Room.prototype.__displayDeletePrompt = function (device, room, deleteCallback) {
    var result = prompt('Are you sure that you want to delete ' + device.getName() + ' from ' + room.getName() + '? (yes | no)');
    if (result !== null && typeof result === 'string' && result.trim().length > 0) {
        if (result.trim().toLowerCase() === 'yes') {
            console.log('Device ' + device.getName() + ' was deleted successfully.');
            deleteCallback(device, room);
        } else if (result.trim().toLowerCase() === 'no') {
            console.log('Cancel operation.');
        } else {
            room.__displayDeletePrompt(device, room, deleteCallback);
        }
    }
}

Room.prototype.deleteDevice = function (device) {
    if (this.getDeviceByName(device.getName()) !== null) {
        this.__displayDeletePrompt(device, this, function (device, room) {
            room.__deleteDevice(device);
        });
    } else {
        console.log('There no device ' + device.getName());
    }
}

Room.prototype.turnOnAllDevices = function () {
    for (var i = 0; i < this.__devices.length; i++) {
        if (this.__devices[i].getStatus() === false) {
            this.__devices[i].turnOn();
        }
    }
}

Room.prototype.turnOffAllDevices = function () {
    for (var i = 0; i < this.__devices.length; i++) {
        if (this.__devices[i].getStatus() === true) {
            this.__devices[i].turnOff();
        }
    }
}

Room.prototype.getInfo = function () {
    var result = 'Room name - ' + this.__name + '\nDevices:';
    for (var i = 0; i < this.__devices.length; i++) {
        result += '\n' + this.__devices[i].getInfo();
    }
    return result + '\n';
}


function SmartHome(name) {
    this.__name = name;
    this.__rooms = [];
};

SmartHome.prototype.getName = function () {
    return this.__name;
}

SmartHome.prototype.setName = function (newName) {
    if (typeof newName === 'string') {
        console.log("Name updated successfully to " + newName);
        this.__name = newName;
        return true;
    }
    console.log('Enter correct name.');
    return false;
}

SmartHome.prototype.getRooms = function () {
    return this.__rooms;
}

SmartHome.prototype.getRoomByName = function (roomName) {
    for (var i = 0; i < this.__rooms.length; i++) {
        if (this.__rooms[i].getName() === roomName) {
            console.log('Room ' + roomName + ' found.');
            return this.__rooms[i];
        }
    }
    console.log('Room not found.');
    return null;
}

SmartHome.prototype.addRoom = function (room) {
    if (!(room instanceof Room)) {
        console.log('Provide the room, that are you searchign for.');
        return false;
    }
    if (this.getRoomByName(room.getName()) !== null) {
        console.log('No room with name ' + room.getName() + 'in home ' + this.__name);
        return false;
    }
    this.__rooms.push(room);
    console.log('Room ' + room.getName() + ' added successfully.');
    return true;
}

SmartHome.prototype.setNewRoomName = function(oldName, newName) {
    // checking that room with oldName exists and room with newName does not exist
    if (this.getRoomByName(oldName) === false || this.getRoomByName(newName) === true) {
        console.log('Room with new name alrady exists OR room with old name does not exist in the' + this.__name);
        return false;
    }
    // checking that newName is a valid room name
    if (typeof newName !== 'string' || newName.trim().length === 0 || newName === oldName) {
        console.log('Provide correct syntax for room name.');
        return false;
    }
    // setting new name to chosed room
    var room = this.getRoomByName(oldName);
    room.setName(newName);
    console.log('Room with name ' + oldName + 'changed its name to ' + newName);
    return true;
}

SmartHome.prototype.__deleteRoom = function (room) {
    for (var i = 0; i < this.__rooms.length; i++) {
        if (this.__rooms[i].getName() === room.getName()) {
            this.__rooms.splice(i, 1);
            break;
        }
    }
}

SmartHome.prototype.__displayDeletePrompt = function (room, home, deleteCallback) {
    var result = prompt('Are you sure that you want to delete ' + room.getName() + ' from ' + home.getName() + '? (yes | no)');
    if (result !== null && typeof result === 'string' && result.trim().length > 0) {
        if (result.trim().toLowerCase() === 'yes') {
            console.log('Room ' + room.getName() + ' was deleted successfully.');
            deleteCallback(room, home);
        } else if (result.trim().toLowerCase() === 'no') {
            console.log('Cancel operation.');
        } else {
            room.__displayDeletePrompt(room, home, deleteCallback);
        }
    }
}

SmartHome.prototype.deleteRoom = function (roomName) {
    // checking if any rooms exist
    if (this.__rooms.length == 0) {
        console.log('There are no rooms in the home.');
        return false;
    }
    // checking if room with roomName exist
    if (this.getRoomByName(roomName) == false) {
        console.log('There are no rooms in the home with name ' + roomName);
        return false;
    }
    var room = this.getRoomByName(roomName);
    this.__displayDeletePrompt(room, this, function (room, home) {
        home.__deleteRoom(room);
    });
    return true;
}

SmartHome.prototype.getDeviceByName = function (deviceName) {
    for (var i = 0; i < this.__rooms.length; i++) {
        if (this.__rooms[i].getDeviceByName(deviceName) !== null) {
            console.log('Device Found');
            return this.__rooms[i].getDeviceByName(deviceName);
        }
    }
    console.log('Device not found.');
    return null;
}

SmartHome.prototype.setNewDeviceName = function (oldDeviceName, newDeviceName) {
    if (this.getDeviceByName(oldDeviceName) === null) {
        console.log('There are no devices with name ' + oldDeviceName + 'in the ' + this.__name);
        return false;
    }
    if (this.getDeviceByName(newDeviceName) !== null) {
        console.log('Device with name ' + newDeviceName + ' already exists in the ' + this.__name);
        return false;
    }
    if (typeof newDeviceName !== 'string' || newDeviceName.trim().length == 0) {
        console.log('Provide correct syntax for device new name.');
        return false;
    }
    var device = this.getDeviceByName(oldDeviceName);
    device.setName(newDeviceName);
    console.log('Device name successfully changed from ' + oldDeviceName + ' to ' + newDeviceName);
    return true;
}

SmartHome.prototype.addNewDevice = function (roomName, device) {
    if (this.getRoomByName(roomName) === null) {
        console.log('There no room with name ' + roomName);
        return false;
    }
    if ((!(device instanceof TV)) && (!(device instanceof Lamp)) && (!(device instanceof AirConditioner))) {
        console.log('Provide correct device to add it.');
        return false;
    }
    console.log('Device added successfully.');
    var room = this.getRoomByName(roomName);
    return room.addDevice(device);
}

SmartHome.prototype.deleteDevice = function (roomName, device) {
    if (this.getRoomByName(roomName) === null) {
        console.log('There no room with name ' + roomName);
        return false;
    }
    if (!(device instanceof Device)) {
        console.log('Provide correcr device to add it.');
        return false;
    }
    var room = this.getRoomByName(roomName);
    return room.deleteDevice(device);
}

SmartHome.prototype.turnOnAllDevices = function () {
    this.__rooms.forEach(function (room) {
        room.turnOnAllDevices();
    });
}

SmartHome.prototype.turnOffAllDevices = function (){
    this.__rooms.forEach(function (room) {
        room.turnOffAllDevices();
    })
}

SmartHome.prototype.getDevices = function () {
    var info = 'Devices: ';
    this.__rooms.forEach(function(room) {
        room.getDevices().forEach(function (device) {
            info += device.getName() + ' ';
        });
    })
    return info;
}

SmartHome.prototype.getRoomsInfo = function () {
    var info = 'Rooms:';
    this.__rooms.forEach(function(room) {
            info += '\n' + room.getName();
    })
    return info;
}

SmartHome.prototype.getInfo = function () {
    var info = 'Home name - ' + this.__name + '\n';
    this.__rooms.forEach(function(room) {
        info += room.getInfo();
    });
    return info;
}


// unit + integration tests
// home managing 
var sh = new SmartHome("My Smart Home");
var room1 = new Room('living room');
var room2 = new Room('Bedroom');
var room3 = new Room('Bathroom');
room1.addDevice(new Lamp("Lamp1"));
room1.addDevice(new Lamp("Lamp2"));
sh.getRoomByName("living room");
sh.addRoom(room1);
sh.addRoom(room1);
sh.addRoom('jhi');
sh.addRoom(room2);
sh.addRoom(room3);
sh.deleteRoom('Bathroom');
sh.setNewRoomName(room2.getName(), 'bedroom');
console.log(sh.getInfo());
sh.getDeviceByName('Lamp1');
sh.getDeviceByName('Lamp2');
sh.setNewDeviceName('Lamp2', 12);
sh.setNewDeviceName('Lamp2', 'Lamp');
sh.addNewDevice("living room", new TV("tv1"));
sh.addNewDevice("bedroom", new AirConditioner("AC1"));
sh.addNewDevice("bedroom", new AirConditioner("AC1"));
var lamp = new Lamp("Lamp 2");
sh.addNewDevice("bedroom", new Lamp("Lamp 2"));

sh.deleteDevice("bedroom", lamp);

console.log(sh.getDevices()) // Lamp1 Lamp2
console.log(sh.getRooms()); // bedroom
sh.turnOnAllDevices();

// air conditioner methods
var ac = sh.getDeviceByName('AC1');
ac.turnOn('AC1');
ac.setTemperature(24);
ac.timer(function () { ac.turnOff()}, 3000 ); // after 3 seconds ac will off, async
ac.setTemperature(38); // 38
ac.decreaseTemperatureBy1(); // 37
ac.increaseTemperatureBy1(); // 38

// tv methods
var tv1 = new TV('TV1');
sh.addNewDevice('bedroom', tv1);
var tv = sh.getDeviceByName('TV1');
tv.turnOn();
tv.timer(function () { tv.turnOff() }, 5000 ); // after 5 seconds tv will off, async
tv.setChannel(3);
tv.nextChannel();
tv.previousChannel();
tv.setVolume(9);
tv.decreaseVolumeBy1();
tv.increaseVolumeBy1();
tv.setRandomChannel();

// lamp methods
var lamp = sh.getDeviceByName('Lamp1');
lamp.setBrightness(3);
lamp.turnOn();
lamp.timer(function () { lamp.turnOff()}, 7000 ); // after 7 seconds lamp will off, async
lamp.decreaseBrightnessBy1();
lamp.increaseBrightnessBy1();

// all devices on|off 
sh.turnOffAllDevices();
console.log(sh.getInfo());
sh.turnOnAllDevices();
console.log(sh.getInfo());


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

interface Device {
  id: string;
  name: string;
  type: "light" | "thermostat" | "camera" | "lock" | "sensor" | "speaker";
  room: string;
  status: "on" | "off";
  value?: number;
  battery?: number;
}

interface Room {
  id: string;
  name: string;
  icon: string;
  devices: number;
  temperature?: number;
  humidity?: number;
}

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [devices, setDevices] = useState<Device[]>([
    { id: "1", name: "Основной свет", type: "light", room: "living", status: "on", value: 80 },
    { id: "2", name: "Торшер", type: "light", room: "living", status: "off", value: 0 },
    { id: "3", name: "Термостат", type: "thermostat", room: "living", status: "on", value: 22 },
    { id: "4", name: "Камера", type: "camera", room: "living", status: "on", battery: 85 },
    
    { id: "5", name: "Потолочный свет", type: "light", room: "bedroom", status: "off", value: 0 },
    { id: "6", name: "Прикроватная лампа", type: "light", room: "bedroom", status: "on", value: 30 },
    { id: "7", name: "Термостат", type: "thermostat", room: "bedroom", status: "on", value: 20 },
    
    { id: "8", name: "Свет", type: "light", room: "kitchen", status: "on", value: 100 },
    { id: "9", name: "Умная колонка", type: "speaker", room: "kitchen", status: "off" },
    
    { id: "10", name: "Входная дверь", type: "lock", room: "entrance", status: "off", battery: 92 },
    { id: "11", name: "Камера", type: "camera", room: "entrance", status: "on", battery: 78 },
    { id: "12", name: "Датчик движения", type: "sensor", room: "entrance", status: "on", battery: 65 },
  ]);

  const rooms: Room[] = [
    { id: "living", name: "Гостиная", icon: "Sofa", devices: 4, temperature: 22, humidity: 45 },
    { id: "bedroom", name: "Спальня", icon: "BedDouble", devices: 3, temperature: 20, humidity: 50 },
    { id: "kitchen", name: "Кухня", icon: "ChefHat", devices: 2, temperature: 23, humidity: 55 },
    { id: "entrance", name: "Прихожая", icon: "DoorOpen", devices: 3, temperature: 19, humidity: 48 },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleDevice = (deviceId: string) => {
    setDevices(devices.map(d => 
      d.id === deviceId ? { ...d, status: d.status === "on" ? "off" : "on" } : d
    ));
  };

  const updateDeviceValue = (deviceId: string, value: number) => {
    setDevices(devices.map(d => 
      d.id === deviceId ? { ...d, value } : d
    ));
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "light": return "Lightbulb";
      case "thermostat": return "Thermometer";
      case "camera": return "Camera";
      case "lock": return "Lock";
      case "sensor": return "Radar";
      case "speaker": return "Speaker";
      default: return "Home";
    }
  };

  const filteredDevices = selectedRoom 
    ? devices.filter(d => d.room === selectedRoom)
    : devices;

  const activeDevices = devices.filter(d => d.status === "on").length;
  const currentRoom = rooms.find(r => r.id === selectedRoom);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Мой умный дом
            </h1>
            <p className="text-slate-400">
              {currentTime.toLocaleDateString("ru-RU", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })} · {currentTime.toLocaleTimeString("ru-RU")}
            </p>
          </div>
          <div className="flex gap-3">
            <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
              <CardContent className="p-4 flex items-center gap-3">
                <Icon name="Zap" className="text-yellow-500" size={24} />
                <div>
                  <p className="text-2xl font-bold text-white">{activeDevices}</p>
                  <p className="text-xs text-slate-400">Активно</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
              <CardContent className="p-4 flex items-center gap-3">
                <Icon name="Home" className="text-blue-500" size={24} />
                <div>
                  <p className="text-2xl font-bold text-white">{devices.length}</p>
                  <p className="text-xs text-slate-400">Устройств</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setSelectedRoom(null)}
            className={`p-6 rounded-xl border transition-all ${
              selectedRoom === null
                ? "bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/50"
                : "bg-slate-800/50 border-slate-700 hover:bg-slate-800 backdrop-blur"
            }`}
          >
            <Icon name="Home" size={32} className={selectedRoom === null ? "text-white mb-3" : "text-slate-400 mb-3"} />
            <h3 className={`font-bold text-lg ${selectedRoom === null ? "text-white" : "text-white"}`}>Все</h3>
            <p className="text-sm text-slate-400">{devices.length} устройств</p>
          </button>
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room.id)}
              className={`p-6 rounded-xl border transition-all ${
                selectedRoom === room.id
                  ? "bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/50"
                  : "bg-slate-800/50 border-slate-700 hover:bg-slate-800 backdrop-blur"
              }`}
            >
              <Icon name={room.icon} size={32} className={selectedRoom === room.id ? "text-white mb-3" : "text-slate-400 mb-3"} />
              <h3 className={`font-bold text-lg ${selectedRoom === room.id ? "text-white" : "text-white"}`}>
                {room.name}
              </h3>
              <p className="text-sm text-slate-400">{room.devices} устройств</p>
              {room.temperature && (
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                  <Icon name="Thermometer" size={14} />
                  <span>{room.temperature}°C</span>
                  <Icon name="Droplets" size={14} className="ml-1" />
                  <span>{room.humidity}%</span>
                </div>
              )}
            </button>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            {currentRoom ? currentRoom.name : "Все устройства"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDevices.map((device) => (
              <Card key={device.id} className="border-slate-700 bg-slate-800/50 backdrop-blur hover:bg-slate-800 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${device.status === "on" ? "bg-blue-500" : "bg-slate-700"}`}>
                        <Icon name={getDeviceIcon(device.type)} size={20} className="text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-base">{device.name}</CardTitle>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {rooms.find(r => r.id === device.room)?.name}
                        </p>
                      </div>
                    </div>
                    <Switch 
                      checked={device.status === "on"} 
                      onCheckedChange={() => toggleDevice(device.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  {device.type === "light" && device.value !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Яркость</span>
                        <span className="text-white font-medium">{device.value}%</span>
                      </div>
                      <Slider
                        value={[device.value]}
                        onValueChange={(value) => updateDeviceValue(device.id, value[0])}
                        max={100}
                        step={1}
                        disabled={device.status === "off"}
                        className="w-full"
                      />
                    </div>
                  )}
                  {device.type === "thermostat" && device.value !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Температура</span>
                        <span className="text-white font-medium">{device.value}°C</span>
                      </div>
                      <Slider
                        value={[device.value]}
                        onValueChange={(value) => updateDeviceValue(device.id, value[0])}
                        min={16}
                        max={30}
                        step={0.5}
                        disabled={device.status === "off"}
                        className="w-full"
                      />
                    </div>
                  )}
                  {device.battery !== undefined && (
                    <div className="flex items-center gap-2 text-sm mt-2">
                      <Icon name="Battery" size={16} className={device.battery > 20 ? "text-green-500" : "text-red-500"} />
                      <span className="text-slate-400">Батарея: </span>
                      <span className="text-white font-medium">{device.battery}%</span>
                    </div>
                  )}
                  {device.type === "camera" && device.status === "on" && (
                    <Badge className="bg-red-500 hover:bg-red-600 mt-2">
                      <Icon name="Video" size={12} className="mr-1" />
                      Запись
                    </Badge>
                  )}
                  {device.type === "lock" && (
                    <Badge className={device.status === "off" ? "bg-green-500 hover:bg-green-600 mt-2" : "bg-yellow-500 hover:bg-yellow-600 mt-2"}>
                      {device.status === "off" ? "Закрыто" : "Открыто"}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Icon name="Clock" size={24} className="text-blue-500" />
                Автоматизация
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700">
                  <div className="flex items-center gap-3">
                    <Icon name="Sunrise" size={20} className="text-yellow-500" />
                    <div>
                      <p className="font-medium text-white">Утренний режим</p>
                      <p className="text-xs text-slate-400">7:00 - Включить свет на кухне</p>
                    </div>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700">
                  <div className="flex items-center gap-3">
                    <Icon name="Moon" size={20} className="text-blue-500" />
                    <div>
                      <p className="font-medium text-white">Ночной режим</p>
                      <p className="text-xs text-slate-400">22:00 - Выключить свет</p>
                    </div>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700">
                  <div className="flex items-center gap-3">
                    <Icon name="DoorOpen" size={20} className="text-green-500" />
                    <div>
                      <p className="font-medium text-white">Охранный режим</p>
                      <p className="text-xs text-slate-400">При выходе - активировать камеры</p>
                    </div>
                  </div>
                  <Switch checked={false} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Icon name="Activity" size={24} className="text-blue-500" />
                Потребление энергии
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Сегодня</span>
                  <span className="text-2xl font-bold text-white">12.4 кВт·ч</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Освещение</span>
                    <span className="text-white">4.2 кВт·ч</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: "34%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Отопление</span>
                    <span className="text-white">6.8 кВт·ч</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500" style={{ width: "55%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Остальное</span>
                    <span className="text-white">1.4 кВт·ч</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: "11%" }} />
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-700 flex items-center gap-2 text-sm">
                  <Icon name="TrendingDown" size={16} className="text-green-500" />
                  <span className="text-slate-400">На 8% меньше чем вчера</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;

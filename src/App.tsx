import React, { useState } from 'react';
import TurkeyMap, { CityType } from 'turkey-map-react';

interface ExtendedCityType extends CityType {
  population: string;
  area: string;
  plate: string;
  districtCount: number;
  historicalPlaces: string[];
}

const cityData: { [key: string]: { population: string; area: string; plate: string; districtCount: number; historicalPlaces: string[] } } = {
  adana: { population: '2.258.718', area: '14.030', plate: '01', districtCount: 15, historicalPlaces: ['Taşköprü', 'Adana Ulu Camii'] },
  adıyaman: { population: '632.148', area: '7.614', plate: '02', districtCount: 9, historicalPlaces: ['Nemrut Dağı', 'Adıyaman Kalesi'] },
  afyonkarahisar: { population: '736.912', area: '14.230', plate: '03', districtCount: 18, historicalPlaces: ['Afyon Kalesi', 'Frig Vadisi'] },
  ağrı: { population: '536.199', area: '11.376', plate: '04', districtCount: 8, historicalPlaces: ['İshak Paşa Sarayı', 'Doğubayazıt Kalesi'] },
  amasya: { population: '337.800', area: '5.520', plate: '05', districtCount: 7, historicalPlaces: ['Amasya Kalesi', 'Kral Kaya Mezarları'] },
  ankara: { population: '5.747.325', area: '25.706', plate: '06', districtCount: 25, historicalPlaces: ['Anıtkabir', 'Ankara Kalesi'] },
  antalya: { population: '2.548.308', area: '20.177', plate: '07', districtCount: 19, historicalPlaces: ['Aspendos', 'Perge Antik Kenti'] },
  artvin: { population: '169.501', area: '7.436', plate: '08', districtCount: 8, historicalPlaces: ['Karagöl', 'Macahel Vadisi'] },
  aydın: { population: '1.119.084', area: '8.007', plate: '09', districtCount: 17, historicalPlaces: ['Aphrodisias', 'Milet Antik Kenti'] },
  balıkesir: { population: '1.228.620', area: '14.583', plate: '10', districtCount: 20, historicalPlaces: ['Kaz Dağları', 'Cunda Adası'] },
  bilecik: { population: '223.448', area: '4.307', plate: '11', districtCount: 8, historicalPlaces: ['Söğüt Ertuğrul Gazi Türbesi', 'Şeyh Edebali Türbesi'] },
  bingöl: { population: '281.768', area: '8.125', plate: '12', districtCount: 8, historicalPlaces: ['Kral Kızı Kalesi', 'Yüzen Adalar'] },
  bitlis: { population: '349.396', area: '8.294', plate: '13', districtCount: 7, historicalPlaces: ['Ahlat Selçuklu Mezarlığı', 'Nemrut Krater Gölü'] },
  bolu: { population: '316.126', area: '8.276', plate: '14', districtCount: 9, historicalPlaces: ['Yedigöller Milli Parkı', 'Abant Gölü'] },
  burdur: { population: '267.092', area: '6.887', plate: '15', districtCount: 11, historicalPlaces: ['Sagalassos Antik Kenti', 'Salda Gölü'] },
  bursa: { population: '3.101.833', area: '10.882', plate: '16', districtCount: 17, historicalPlaces: ['Uludağ', 'Cumalıkızık'] },
  çanakkale: { population: '542.157', area: '9.817', plate: '17', districtCount: 12, historicalPlaces: ['Truva Antik Kenti', 'Çanakkale Şehitleri Anıtı'] },
  çankırı: { population: '216.362', area: '7.388', plate: '18', districtCount: 12, historicalPlaces: ['Çankırı Kalesi', 'Ilgaz Dağı Milli Parkı'] },
  çorum: { population: '530.126', area: '12.820', plate: '19', districtCount: 14, historicalPlaces: ['Hattuşaş', 'Alacahöyük'] },
  denizli: { population: '1.037.208', area: '11.868', plate: '20', districtCount: 19, historicalPlaces: ['Pamukkale', 'Hierapolis Antik Kenti'] },
  diyarbakır: { population: '1.756.353', area: '15.168', plate: '21', districtCount: 17, historicalPlaces: ['Diyarbakır Surları', 'Hasan Paşa Hanı'] },
  edirne: { population: '407.763', area: '6.276', plate: '22', districtCount: 9, historicalPlaces: ['Selimiye Camii', 'Edirne Sarayı'] },
  elazığ: { population: '588.088', area: '9.383', plate: '23', districtCount: 11, historicalPlaces: ['Harput Kalesi', 'Buzluk Mağarası'] },
  erzincan: { population: '234.747', area: '11.903', plate: '24', districtCount: 9, historicalPlaces: ['Erzincan Kalesi', 'Mama Hatun Kervansarayı'] },
  erzurum: { population: '762.021', area: '25.066', plate: '25', districtCount: 20, historicalPlaces: ['Çifte Minareli Medrese', 'Palandöken Dağı'] },
  eskişehir: { population: '888.828', area: '13.925', plate: '26', districtCount: 14, historicalPlaces: ['Odunpazarı Evleri', 'Sazova Parkı'] },
  gaziantep: { population: '2.130.432', area: '6.887', plate: '27', districtCount: 9, historicalPlaces: ['Zeugma Mozaik Müzesi', 'Gaziantep Kalesi'] },
  giresun: { population: '448.721', area: '6.934', plate: '28', districtCount: 16, historicalPlaces: ['Giresun Kalesi', 'Kuzalan Şelalesi'] },
  gümüşhane: { population: '141.702', area: '6.575', plate: '29', districtCount: 6, historicalPlaces: ['Karaca Mağarası', 'Santa Harabeleri'] },
  hakkâri: { population: '280.991', area: '7.121', plate: '30', districtCount: 4, historicalPlaces: ['Cilo Dağı', 'Zap Vadisi'] },
  hatay: { population: '1.628.894', area: '5.403', plate: '31', districtCount: 15, historicalPlaces: ['Antakya Arkeoloji Müzesi', 'Habib-i Neccar Camii'] },
  ısparta: { population: '444.914', area: '8.933', plate: '32', districtCount: 13, historicalPlaces: ['Eğirdir Gölü', 'Davraz Dağı'] },
  mersin: { population: '1.840.425', area: '15.853', plate: '33', districtCount: 13, historicalPlaces: ['Kızkalesi', 'Cennet-Cehennem Mağaraları'] },
  istanbul: { population: '15.840.900', area: '5.343', plate: '34', districtCount: 39, historicalPlaces: ['Ayasofya', 'Topkapı Sarayı'] },
  izmir: { population: '4.394.694', area: '11.891', plate: '35', districtCount: 30, historicalPlaces: ['Efes Antik Kenti', 'Saat Kulesi'] },
  kars: { population: '285.410', area: '9.442', plate: '36', districtCount: 8, historicalPlaces: ['Ani Harabeleri', 'Kars Kalesi'] },
  kastamonu: { population: '383.373', area: '13.108', plate: '37', districtCount: 20, historicalPlaces: ['Kastamonu Kalesi', 'Ilgaz Dağı'] },
  kayseri: { population: '1.407.409', area: '16.917', plate: '38', districtCount: 16, historicalPlaces: ['Erciyes Dağı', 'Kayseri Kalesi'] },
  kırklareli: { population: '361.836', area: '6.550', plate: '39', districtCount: 8, historicalPlaces: ['Dupnisa Mağarası', 'Kırklareli Müzesi'] },
  kırşehir: { population: '242.196', area: '6.570', plate: '40', districtCount: 7, historicalPlaces: ['Cacabey Medresesi', 'Kaman Kalehöyük'] },
  kocaeli: { population: '1.997.258', area: '3.626', plate: '41', districtCount: 12, historicalPlaces: ['İzmit Saat Kulesi', 'Kartepe'] },
  konya: { population: '2.250.020', area: '38.873', plate: '42', districtCount: 31, historicalPlaces: ['Mevlana Müzesi', 'Alaeddin Tepesi'] },
  kütahya: { population: '578.640', area: '11.875', plate: '43', districtCount: 13, historicalPlaces: ['Kütahya Kalesi', 'Aizanoi Antik Kenti'] },
  malatya: { population: '800.165', area: '12.313', plate: '44', districtCount: 13, historicalPlaces: ['Nemrut Dağı', 'Malatya Müzesi'] },
  manisa: { population: '1.429.643', area: '13.269', plate: '45', districtCount: 17, historicalPlaces: ['Manisa Kalesi', 'Spil Dağı'] },
  kahramanmaraş: { population: '1.168.163', area: '14.327', plate: '46', districtCount: 11, historicalPlaces: ['Kahramanmaraş Kalesi', 'Eshab-ı Kehf Külliyesi'] },
  mardin: { population: '854.716', area: '8.891', plate: '47', districtCount: 10, historicalPlaces: ['Mardin Müzesi', 'Deyrulzafaran Manastırı'] },
  muğla: { population: '1.000.773', area: '13.338', plate: '48', districtCount: 13, historicalPlaces: ['Bodrum Kalesi', 'Saklıkent Kanyonu'] },
  muş: { population: '411.117', area: '8.196', plate: '49', districtCount: 6, historicalPlaces: ['Muradiye Camii', 'Malazgirt Kalesi'] },
  nevşehir: { population: '303.010', area: '5.467', plate: '50', districtCount: 8, historicalPlaces: ['Göreme Açık Hava Müzesi', 'Uçhisar Kalesi'] },
  niğde: { population: '362.071', area: '7.312', plate: '51', districtCount: 6, historicalPlaces: ['Gümüşler Manastırı', 'Tyana Su Kemerleri'] },
  ordu: { population: '760.872', area: '5.861', plate: '52', districtCount: 19, historicalPlaces: ['Boztepe', 'Ordu Kalesi'] },
  rize: { population: '331.048', area: '3.920', plate: '53', districtCount: 12, historicalPlaces: ['Rize Kalesi', 'Zilkale'] },
  sakarya: { population: '1.042.649', area: '4.878', plate: '54', districtCount: 16, historicalPlaces: ['Sakarya Müzesi', 'Sapanca Gölü'] },
  samsun: { population: '1.356.079', area: '9.352', plate: '55', districtCount: 17, historicalPlaces: ['Amisos Tepesi', 'Bandırma Vapuru Müzesi'] },
  siirt: { population: '331.070', area: '5.718', plate: '56', districtCount: 7, historicalPlaces: ['Ulu Camii', 'Veysel Karani Türbesi'] },
  sinop: { population: '218.243', area: '5.862', plate: '57', districtCount: 9, historicalPlaces: ['Sinop Kalesi', 'Hamsilos Koyu'] },
  sivas: { population: '646.608', area: '28.488', plate: '58', districtCount: 17, historicalPlaces: ['Divriği Ulu Camii', 'Gök Medrese'] },
  tekirdağ: { population: '1.081.065', area: '6.313', plate: '59', districtCount: 11, historicalPlaces: ['Rüstem Paşa Camii', 'Tekirdağ Müzesi'] },
  tokat: { population: '612.646', area: '10.042', plate: '60', districtCount: 12, historicalPlaces: ['Ballıca Mağarası', 'Tokat Kalesi'] },
  trabzon: { population: '816.684', area: '4.685', plate: '61', districtCount: 18, historicalPlaces: ['Sümela Manastırı', 'Trabzon Kalesi'] },
  tunceli: { population: '84.660', area: '7.774', plate: '62', districtCount: 8, historicalPlaces: ['Munzur Vadisi', 'Pertek Kalesi'] },
  şanlıurfa: { population: '2.073.614', area: '19.451', plate: '63', districtCount: 13, historicalPlaces: ['Göbeklitepe', 'Balıklıgöl'] },
  uşak: { population: '370.509', area: '5.341', plate: '64', districtCount: 6, historicalPlaces: ['Blaundus Antik Kenti', 'Cilandiras Köprüsü'] },
  van: { population: '1.136.757', area: '21.334', plate: '65', districtCount: 14, historicalPlaces: ['Van Kalesi', 'Akdamar Adası'] },
  yozgat: { population: '421.041', area: '14.123', plate: '66', districtCount: 14, historicalPlaces: ['Çamlık Milli Parkı', 'Yozgat Müzesi'] },
  zonguldak: { population: '596.053', area: '3.481', plate: '67', districtCount: 8, historicalPlaces: ['Filyos Kalesi', 'Gökgöl Mağarası'] },
  aksaray: { population: '416.367', area: '7.626', plate: '68', districtCount: 7, historicalPlaces: ['Ihlara Vadisi', 'Aksaray Müzesi'] },
  bayburt: { population: '81.910', area: '3.652', plate: '69', districtCount: 3, historicalPlaces: ['Bayburt Kalesi', 'Aydıntepe Yeraltı Şehri'] },
  karaman: { population: '254.919', area: '9.163', plate: '70', districtCount: 6, historicalPlaces: ['Karaman Kalesi', 'Binbir Kilise'] },
  kırıkkale: { population: '283.017', area: '4.365', plate: '71', districtCount: 9, historicalPlaces: ['Silah Müzesi', 'Hasandede Camii'] },
  batman: { population: '620.278', area: '4.649', plate: '72', districtCount: 6, historicalPlaces: ['Hasankeyf', 'Malabadi Köprüsü'] },
  şırnak: { population: '537.762', area: '7.172', plate: '73', districtCount: 7, historicalPlaces: ['Cudi Dağı', 'Kasrik Boğazı'] },
  bartın: { population: '198.999', area: '2.140', plate: '74', districtCount: 4, historicalPlaces: ['Amasra Kalesi', 'Kuşkayası Yol Anıtı'] },
  ardahan: { population: '98.335', area: '5.576', plate: '75', districtCount: 6, historicalPlaces: ['Şeytan Kalesi', 'Yalnızçam Yaylası'] },
  ığdır: { population: '199.442', area: '3.539', plate: '76', districtCount: 4, historicalPlaces: ['İshak Paşa Sarayı', 'Meteor Çukuru'] },
  yalova: { population: '276.050', area: '847', plate: '77', districtCount: 6, historicalPlaces: ['Yürüyen Köşk', 'Termal Kaplıcaları'] },
  karabük: { population: '248.458', area: '4.145', plate: '78', districtCount: 6, historicalPlaces: ['Safranbolu', 'Yenice Ormanları'] },
  kilis: { population: '142.541', area: '1.521', plate: '79', districtCount: 4, historicalPlaces: ['Oylum Höyük', 'Ravanda Kalesi'] },
  osmaniye: { population: '548.556', area: '3.767', plate: '80', districtCount: 7, historicalPlaces: ['Karatepe Aslantaş', 'Toprakkale Kalesi'] },
  düzce: { population: '392.166', area: '3.641', plate: '81', districtCount: 8, historicalPlaces: ['Güzeldere Şelalesi', 'Samandere Şelalesi'] },
};

function App() {
  const [selectedCity, setSelectedCity] = useState<ExtendedCityType | null>(null);

  const handleCityClick = (city: CityType) => {
    const cityInfo = Object.values(cityData).find(data => data.plate === city.plateNumber.toString().padStart(2, '0'));
    if (cityInfo) {
      setSelectedCity({ ...city, ...cityInfo });
    }
  };

  const handleClose = () => {
    setSelectedCity(null);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
      <h1 style={{ marginBottom: '20px' }}>Türkiye İller Bilgi Haritası</h1>
      <div style={{ width: '90%', height: '90%' }}>
        <TurkeyMap 
          onClick={handleCityClick} 
          customStyle={{ idleColor: "#87CEEB", hoverColor: "#32CD32" }} 
        />
        {selectedCity && (
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 15px rgba(0,0,0,0.2)' }}>
            <h2 style={{ color: '#444' }}>{selectedCity.name}</h2>
            <p style={{ color: '#555' }}>
              Nüfus: {selectedCity.population}<br />
              Yüzölçümü: {selectedCity.area} km²<br />
              Plaka: {selectedCity.plate}<br />
              İlçe Sayısı: {selectedCity.districtCount}<br />
              Tarihi Yerler: {selectedCity.historicalPlaces.join(', ')}
            </p>
            <button onClick={handleClose}>Kapat</button>
          </div>
        )}
      </div>
      </div>
  );
}

export default App;

function generateQR() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const blood = document.getElementById('blood').value;
    const illness = document.getElementById('illness').value;
  
    const data = {
      name,
      age,
      blood,
      illness
    };
  
    const qrText = JSON.stringify(data);
    const qrcode = document.getElementById('qrcode');
    qrcode.innerHTML = '';
    QRCode.toCanvas(qrcode, qrText, function (error) {
      if (error) console.error(error);
      console.log('QR generated!');
    });
  
    document.getElementById('sendHospitalBtn').style.display = 'inline-block';
  }
  
  document.getElementById('sendHospitalBtn').addEventListener('click', async () => {
    const illness = document.getElementById('illness').value;
  
    const hospital = await findHospitalNearby(illness);
  
    const status = document.getElementById('hospitalStatus');
    status.innerText = `✅ Sent to ${hospital.name} for quick medical help.`;
  });
  
  async function findHospitalNearby(illness) {
    // Simulated hospital data
    const hospitals = [
      { name: "City Heart Hospital", specialties: ["heart", "cardiac"] },
      { name: "NeuroCare", specialties: ["brain", "stroke"] },
      { name: "OrthoLife", specialties: ["fracture", "bone"] }
    ];
  
    // Match by illness keyword
    const lowerIllness = illness.toLowerCase();
    for (let hospital of hospitals) {
      for (let spec of hospital.specialties) {
        if (lowerIllness.includes(spec)) {
          return hospital;
        }
      }
    }
  
    return { name: "General Hospital" };
  }
  
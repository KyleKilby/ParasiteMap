//CREATE MAP  
  const map = L.map('map').setView([20, 0], 2);
  const baseMaps = {
  "Default": L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; CARTO' }),
  };
  // Add to map
  baseMaps["Default"].addTo(map);

// GET COUNTRY DATA
  fetch('data/countries.geojson')
  .then(response => response.json())
  .then(data => {

    // Default country styling (without Strongyloides)
    const defaultStyle = () => ({
      color: "#000000", // Border color
      weight: 0.3,       // Border thickness
      fillColor: "#CDE7FF", // Fill color
      fillOpacity: 0
    });

    // Add countries to the map
    const geojsonLayer = L.geoJSON(data, {
      style: defaultStyle,
      onEachFeature: (feature, layer) => {
        const countryName = feature.properties.ADMIN || "Unknown Country";
        const parasites = feature.properties.endemicParasites || [];
        const parasiteList = parasites.length > 0 ? `<ul>${parasites.map(p => `<li>${p}</li>`).join('')}</ul>` : 'No endemic parasites listed.';
        
        layer.bindPopup(`<strong>${countryName}</strong><br>Click for more details.`);

      // Add interactivity for clicks
        layer.on('click', () => {
          const details = `<h3>${countryName}</h3>
            <p><strong>Endemic Parasites:</strong> ${parasiteList}</p>`;
          layer.bindPopup(details).openPopup();
        });
      }
    }).addTo(map);

// PARASITES LIST

// STRONGYLOIDES
    // Assign Colour
    const getColorForStrongyloides = (parasites) => {
      return parasites.includes("Strongyloides stercoralis") ? "#fa0000" : "#fafafa";
    };

    // Define Layer Style
    const styleByStrongyloides = (feature) => {
      const parasites = feature.properties.endemicParasites || [];
      return {
        fillColor: getColorForStrongyloides(parasites),
        weight: 0.5,
        color: '#000000',
        fillOpacity: 0.3
      };
    };

    // Create Layer
    const geojsonLayerStrongyloides = L.geoJSON(data, {
      style: styleByStrongyloides,
      onEachFeature: (feature, layer) => {
        const countryName = feature.properties.ADMIN || "Unknown Country";
        const parasites = feature.properties.endemicParasites || [];
        const parasiteList = parasites.length > 0 ? `<ul>${parasites.map(p => `<li>${p}</li>`).join('')}</ul>` : 'No endemic parasites listed.';
        
        layer.bindPopup(`<strong>${countryName}</strong><br>Click for more details.`);
        layer.on('click', () => {
          const details = `<h3>${countryName}</h3>
            <p><strong>Endemic Parasites:</strong> ${parasiteList}</p>`;
          layer.bindPopup(details).openPopup();
        });
      }
    });

  
//ASCARIS
    // Asign Colour
    const getColorForAscaris = (parasites) => {
      return parasites.includes("Ascaris lumbricoides") ? "#004702" : "#fafafa";
    };

    // Define Layer Style
    const styleByAscaris = (feature) => {
      const parasites = feature.properties.endemicParasites || [];
      return {
        fillColor: getColorForAscaris(parasites),
        weight: 0.5,
        color: '#000000',
        fillOpacity: 0.3
      };
    };

    // Create Layer
    const geojsonLayerAscaris = L.geoJSON(data, {
      style: styleByAscaris,
      onEachFeature: (feature, layer) => {
        const countryName = feature.properties.ADMIN || "Unknown Country";
        const parasites = feature.properties.endemicParasites || [];
        const parasiteList = parasites.length > 0 ? `<ul>${parasites.map(p => `<li>${p}</li>`).join('')}</ul>` : 'No endemic parasites listed.';
        
        layer.bindPopup(`<strong>${countryName}</strong><br>Click for more details.`);
        layer.on('click', () => {
          const details = `<h3>${countryName}</h3>
            <p><strong>Endemic Parasites:</strong> ${parasiteList}</p>`;
          layer.bindPopup(details).openPopup();
      });
    }});

//TISSUE ROUNDWORMS
    // Assign colours
    const getColorForRoundworm = (parasites) => {
        if (parasites.includes("Wuchereria bancrofti") && parasites.includes("Dracunculus medinensis")) {return "#027d2d"}
        if (parasites.includes("Trichinella species")) {return "#662937";}
        if (parasites.includes("Dracunculus medinensis")) {return "#c28e00";}
        if (parasites.includes("Wuchereria bancrofti")) {return "#0010a3";}
        if (parasites.includes("Brugia species")) {return "#0010a3";}
        if (parasites.includes("Loa loa")) {return "#FD9DB1";} 
        if (parasites.includes("Onchocerca volvulus")) {return "#83FEE7";}  
        if (parasites.includes("Ancylostoma braziliense")) {return "#E86D07";} 
        if (parasites.includes("Toxocara species")) {return "#DED8F8";} 
        return "#fafafa"; // Default
    };

    // Define Layer Style
    const styleByRoundworm = (feature) => {
      const parasites = feature.properties.endemicParasites || [];
      return {
        fillColor: getColorForRoundworm(parasites),
        weight: 0.5,
        color: '#000000',
        fillOpacity: 0.3
      };
    }

    // Add Legend
    const RoundwormLegend = L.control({ position: 'bottomright' });
    RoundwormLegend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');
    const RoundwormColors = [
        { species: "Lymphatic Filariasis", color: "#0010a3" },
        { species: "Dracunculus medinensis", color: "#c28e00" },
        { species: "Trichinella species", color: "#662937" },
        { species: "Loa loa", color: "#FD9DB1" },
        { species: "Onchocerca volvulus", color: "#83FEE7" },
        { species: "Ancylostoma braziliense", color: "#E86D07" },
        { species: "Toxocara species", color: "#DED8F8" },
        { species: "LF + Dracunculus", color: "#027d2d" }
    ];
    div.innerHTML = '<h4>Tissue Roundworms</h4>';
    RoundwormColors.forEach(entry => {
        div.innerHTML += `<i style="background:${entry.color}; width: 18px; height: 18px; display: inline-block; margin-right: 8px;"></i>${entry.species}<br>`;
    });
    return div;
    };

    // Create Layer
    const geojsonLayerRoundworm = L.geoJSON(data, {
    style: styleByRoundworm,
    onEachFeature: (feature, layer) => {
    const countryName = feature.properties.ADMIN || "Unknown Country";
    const parasites = feature.properties.endemicParasites || [];
    const parasiteList = parasites.length > 0 ? `<ul>${parasites.map(p => `<li>${p}</li>`).join('')}</ul>` : 'No endemic parasites listed.';
        
    layer.bindPopup(`<strong>${countryName}</strong><br>Click for more details.`);
    layer.on('click', () => {
      const details = `<h3>${countryName}</h3>
        <p><strong>Endemic Parasites:</strong> ${parasiteList}</p>`;
      layer.bindPopup(details).openPopup();
    });

    }}).on('add', () => {
    RoundwormLegend.addTo(map); 
    }).on('remove', () => {
    map.removeControl(RoundwormLegend);
    });

//SHISTO
    // Assign colours
    const getColorForSchisto = (parasites) => {
      if (parasites.includes("Schistosoma mansoni") && parasites.includes("Schistosoma haematobium")) {return "#027d2d"}
      if (parasites.includes("Schistosoma mekongi")) {return "#ff3842";}
      if (parasites.includes("Schistosoma haematobium")) {return "#c28e00";}
      if (parasites.includes("Schistosoma mansoni")) {return "#0010a3";}
      if (parasites.includes("Schistosoma japonicum")) {return "#460f5c";} 
      return "#fafafa"; // Default
  };

  // Define Layer Style
  const styleBySchisto = (feature) => {
    const parasites = feature.properties.endemicParasites || [];
    return {
      fillColor: getColorForSchisto(parasites),
      weight: 0.5,
      color: '#000000',
      fillOpacity: 0.3
    };
  }

  // Add Legend
  const schistoLegend = L.control({ position: 'bottomright' });
  schistoLegend.onAdd = function (map) {
  const div = L.DomUtil.create('div', 'info legend');
  const schistoColors = [
      { species: "Schistosoma mansoni", color: "#0010a3" },
      { species: "Schistosoma haematobium", color: "#c28e00" },
      { species: "Both mansoni & haematobium", color: "#027d2d" },
      { species: "Schistosoma mekongi", color: "#ff3842" },
      { species: "Schistosoma japonicum", color: "#460f5c" }
  ];
  div.innerHTML = '<h4>Schistosoma Species</h4>';
  schistoColors.forEach(entry => {
      div.innerHTML += `<i style="background:${entry.color}; width: 18px; height: 18px; display: inline-block; margin-right: 8px;"></i>${entry.species}<br>`;
  });
  return div;
  };

  // Create Layer
  const geojsonLayerSchisto = L.geoJSON(data, {
  style: styleBySchisto,
  onEachFeature: (feature, layer) => {
  const countryName = feature.properties.ADMIN || "Unknown Country";
  const parasites = feature.properties.endemicParasites || [];
  const parasiteList = parasites.length > 0 ? `<ul>${parasites.map(p => `<li>${p}</li>`).join('')}</ul>` : 'No endemic parasites listed.';
        
  layer.bindPopup(`<strong>${countryName}</strong><br>Click for more details.`);
  layer.on('click', () => {
    const details = `<h3>${countryName}</h3>
      <p><strong>Endemic Parasites:</strong> ${parasiteList}</p>`;
    layer.bindPopup(details).openPopup();
  });
  }})
  .on('add', () => {
  schistoLegend.addTo(map); 
  }).on('remove', () => {
  map.removeControl(schistoLegend);
  });


// LAYER CONTROL
    L.control.layers({
      "Default": geojsonLayer,
      "Ascaris": geojsonLayerAscaris,
      "Schistosoma": geojsonLayerSchisto,
      "Strongyloides": geojsonLayerStrongyloides,
      "Tissue Roundworms": geojsonLayerRoundworm
    }).addTo(map);

})


.catch(error => console.error('Error loading GeoJSON:', error));
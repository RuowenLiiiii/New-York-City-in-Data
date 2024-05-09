function formatSpeciesName(species) {
    return species.replace(/([A-Z])/g, ' $1').trim();
}

document.addEventListener('DOMContentLoaded', function () {
    const filterOptions = document.querySelectorAll('.filter-option');
    let currentFilteredInfoHTML = ''; 

    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            this.classList.toggle('active');
            applyFilters();
        });
    });

    function applyFilters() {
        const selectedYears = Array.from(document.querySelectorAll('.filter-column:nth-child(1) .filter-option.active')).map(opt => opt.getAttribute('data-value'));
        const selectedMonths = Array.from(document.querySelectorAll('.filter-column:nth-child(2) .filter-option.active')).map(opt => opt.getAttribute('data-value'));
    
        const animalElements = document.querySelectorAll('#animalDisplay .animal-img');
        const infoContainer = document.getElementById('animal-info');
        infoContainer.innerHTML = '';  
        currentFilteredInfoHTML = ''; 
    
        const isFilterActive = selectedYears.length > 0 || selectedMonths.length > 0;

        animalElements.forEach(element => {
            const year = element.getAttribute('data-year');
            const months = element.getAttribute('data-month').split(', ');
            const species = formatSpeciesName(element.getAttribute('data-species'));
            const condition = element.getAttribute('data-condition');
            const status = element.getAttribute('data-status');
            const age = element.getAttribute('data-age');
            const animalClass = element.getAttribute('data-class');
    
            const matchesYear = selectedYears.length === 0 || selectedYears.includes(year);
            const matchesMonth = selectedMonths.length === 0 || months.some(month => selectedMonths.includes(month));
    
            const imgElement = element.querySelector('img');
            if (isFilterActive && matchesYear && matchesMonth) {
                imgElement.src = `1/${species.replace(/\s/g, '')}1.png`; 
                const animalInfoHTML = `<div>
                    <h4>${species}</h4>
                    <p>Year: ${year}</p>
                    <p>Month: ${months.join(', ')}</p>
                    <p>Condition: ${condition}</p>
                    <p>Status: ${status}</p>
                    <p>Age: ${age}</p>
                    <p>Class: ${animalClass}</p>
                </div>`;
                infoContainer.innerHTML += animalInfoHTML;
                currentFilteredInfoHTML += animalInfoHTML; 
            } else {
                imgElement.src = `1/${species.replace(/\s/g, '')}.png`; 
            }
        });
        
        if (!isFilterActive) {
            animalElements.forEach(element => {
                element.querySelector('img').src = `1/${formatSpeciesName(element.getAttribute('data-species')).replace(/\s/g, '')}.png`;
            });
            infoContainer.innerHTML = ''; 
        }
    }

    function isFilterActive() {
        // 检查是否有筛选条件激活
        const selectedYears = Array.from(document.querySelectorAll('.filter-column:nth-child(1) .filter-option.active')).map(opt => opt.getAttribute('data-value'));
        const selectedMonths = Array.from(document.querySelectorAll('.filter-column:nth-child(2) .filter-option.active')).map(opt => opt.getAttribute('data-value'));
        return selectedYears.length > 0 || selectedMonths.length > 0;
    }

    animalImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            // 当鼠标进入时，更新图片和信息
            const species = formatSpeciesName(this.parentElement.getAttribute('data-species'));
            this.src = `1/${species.replace(/\s/g, '')}2.png`;
            const infoContainer = document.getElementById('animal-info');
            const year = this.parentElement.getAttribute('data-year');
            const month = this.parentElement.getAttribute('data-month');
            const condition = this.parentElement.getAttribute('data-condition');
            const status = this.parentElement.getAttribute('data-status');
            const age = this.parentElement.getAttribute('data-age');
            const animalClass = this.parentElement.getAttribute('data-class');

            infoContainer.innerHTML = `
                <h4>${species}</h4>
                <p>Year: ${year}</p>
                <p>Month: ${month}</p>
                <p>Condition: ${condition}</p>
                <p>Status: ${status}</p>
                <p>Age: ${age}</p>
                <p>Class: ${animalClass}</p>
            `;
        });

        img.addEventListener('mouseleave', function() {
            const infoContainer = document.getElementById('animal-info');
            if (isFilterActive()) {
                infoContainer.innerHTML = currentFilteredInfoHTML;  
            } else {
                infoContainer.innerHTML = '';  
            }
            // 恢复
            const species = formatSpeciesName(this.parentElement.getAttribute('data-species'));
            if (shouldUseFilteredSrc(this.parentElement)) {
                this.src = `1/${species.replace(/\s/g, '')}1.png`;
            } else {
                this.src = `1/${species.replace(/\s/g, '')}.png`;
            }
        });
    });
});






document.addEventListener('DOMContentLoaded', function () {
    const flipButton = document.getElementById('flip-button');
    const outerContainer = document.getElementById('outer-container');
    const backFace = document.getElementById('back-face');
    const innerContainer = document.getElementById('inner-container');
    const animalDisplay = document.getElementById('animalDisplay');
    const animalInfo = document.getElementById('animal-info');
    const filtersContainer = document.getElementById('filters-container');
    const projectInfo = document.getElementById('project-info');

    flipButton.addEventListener('click', function() {
        outerContainer.classList.toggle('flipped');
        if (outerContainer.classList.contains('flipped')) {
            innerContainer.style.backgroundColor = 'black';
            innerContainer.style.backgroundImage = 'none'; 
            animalDisplay.style.display = 'none';
            animalInfo.style.display = 'none';
            filtersContainer.style.display = 'none';
            backFace.style.display = 'flex';
            projectInfo.style.visibility = 'visible';
            projectInfo.style.opacity = '1';
            setTimeout(() => {
                backFace.style.opacity = '1';
            }, 50);
        } else {
            innerContainer.style.backgroundColor = ''; 
            innerContainer.style.backgroundImage = ''; 
            animalDisplay.style.display = 'block';
            animalInfo.style.display = 'block';
            filtersContainer.style.display = 'flex';
            backFace.style.display = 'none';
            projectInfo.style.visibility = 'hidden';
            projectInfo.style.opacity = '0';
            setTimeout(() => {
                animalDisplay.style.opacity = '1';
                animalInfo.style.opacity = '1';
                filtersContainer.style.opacity = '1';
            }, 500); 
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const innerContainer = document.getElementById('inner-container');
    setTimeout(() => {
        innerContainer.style.opacity = '1';
    }, 2000); 
});





document.addEventListener('DOMContentLoaded', function () {
    const animalImages = document.querySelectorAll('.animal-img img');


    function shouldUseFilteredSrc(element) {
        const selectedYears = Array.from(document.querySelectorAll('.filter-column:nth-child(1) .filter-option.active')).map(opt => opt.getAttribute('data-value'));
        const selectedMonths = Array.from(document.querySelectorAll('.filter-column:nth-child(2) .filter-option.active')).map(opt => opt.getAttribute('data-value'));
        const year = element.getAttribute('data-year');
        const months = element.getAttribute('data-month').split(', ');

        return selectedYears.includes(year) || months.some(month => selectedMonths.includes(month));
    }

    function isFilterActive() {
        const selectedYears = Array.from(document.querySelectorAll('.filter-column:nth-child(1) .filter-option.active')).map(opt => opt.getAttribute('data-value'));
        const selectedMonths = Array.from(document.querySelectorAll('.filter-column:nth-child(2) .filter-option.active')).map(opt => opt.getAttribute('data-value'));
        return selectedYears.length > 0 || selectedMonths.length > 0;
    }

    animalImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            const species = formatSpeciesName(this.parentElement.getAttribute('data-species'));
            if (isFilterActive()) {
                this.src = `1/${species.replace(/\s/g, '')}2.png`;
            } else {
                this.src = `1/${species.replace(/\s/g, '')}1.png`;
            }

            const infoContainer = document.getElementById('animal-info');
            const year = this.parentElement.getAttribute('data-year');
            const month = this.parentElement.getAttribute('data-month');
            const condition = this.parentElement.getAttribute('data-condition');
            const status = this.parentElement.getAttribute('data-status');
            const age = this.parentElement.getAttribute('data-age');
            const animalClass = this.parentElement.getAttribute('data-class');

            infoContainer.innerHTML = `
                <h4>${species}</h4>
                <p>Year: ${year}</p>
                <p>Month: ${month}</p>
                <p>Condition: ${condition}</p>
                <p>Status: ${status}</p>
                <p>Age: ${age}</p>
                <p>Class: ${animalClass}</p>
            `;
        });

        img.addEventListener('mouseleave', function() {
            const species = formatSpeciesName(this.parentElement.getAttribute('data-species'));
            if (!isFilterActive()) {
                this.src = `1/${species.replace(/\s/g, '')}.png`;
                const infoContainer = document.getElementById('animal-info');
                infoContainer.innerHTML = '';  
            } else {
                const selectedYears = Array.from(document.querySelectorAll('.filter-column:nth-child(1) .filter-option.active')).map(opt => opt.getAttribute('data-value'));
                const selectedMonths = Array.from(document.querySelectorAll('.filter-column:nth-child(2) .filter-option.active')).map(opt => opt.getAttribute('data-value'));
                const year = this.parentElement.getAttribute('data-year');
                const months = this.parentElement.getAttribute('data-month').split(', ');
                const matchesYear = selectedYears.length === 0 || selectedYears.includes(year);
                const matchesMonth = selectedMonths.length === 0 || months.some(month => selectedMonths.includes(month));
        
                if (matchesYear && matchesMonth) {
                    this.src = `1/${species.replace(/\s/g, '')}1.png`;
                } else {
                    this.src = `1/${species.replace(/\s/g, '')}.png`;
                }
            }
        });
    });

    function displayFilteredAnimalsInfo() {
        const selectedYears = Array.from(document.querySelectorAll('.filter-column:nth-child(1) .filter-option.active')).map(opt => opt.getAttribute('data-value'));
        const selectedMonths = Array.from(document.querySelectorAll('.filter-column:nth-child(2) .filter-option.active')).map(opt => opt.getAttribute('data-value'));
        const infoContainer = document.getElementById('animal-info');
        infoContainer.innerHTML = ''; 

        document.querySelectorAll('#animalDisplay .animal-img').forEach(element => {
            const year = element.getAttribute('data-year');
            const months = element.getAttribute('data-month').split(', ');
            const species = element.getAttribute('data-species');
            const condition = element.getAttribute('data-condition');
            const status = element.getAttribute('data-status');
            const age = element.getAttribute('data-age');
            const animalClass = element.getAttribute('data-class');

            if ((selectedYears.length === 0 || selectedYears.includes(year)) && 
                (selectedMonths.length === 0 || months.some(month => selectedMonths.includes(month)))) {
                infoContainer.innerHTML += `
                    <div>
                        <h4>${species}</h4>
                        <p>Year: ${year}</p>
                        <p>Month: ${months.join(', ')}</p>
                        <p>Condition: ${condition}</p>
                        <p>Status: ${status}</p>
                        <p>Age: ${age}</p>
                        <p>Class: ${animalClass}</p>
                    </div>`;
            }
        });
    }
});









document.addEventListener('DOMContentLoaded', function () {
    const backgrounds = [
        "rgba(195, 194, 191, 1.0)",
        // "url('1/1.jpg')",
        // "url('1/2.jpg')",
        // "url('1/3.jpg')",
        "url('1/4.jpg')",
        "url('1/6.jpg')",
        // "url('1/7.jpg')",
        "url('1/8.jpg')",
        // "url('1/10.jpg')",
        "url('1/11.jpg')"
    ];
    let currentBackground = 0;

    const innerContainer = document.getElementById('inner-container');

    const setInnerBackground = () => {
        if (backgrounds[currentBackground] === "rgba(195, 194, 191, 1.0)") {
            innerContainer.style.backgroundImage = 'none'; 
            innerContainer.style.backgroundColor = backgrounds[currentBackground]; 
        } else {
            innerContainer.style.backgroundImage = backgrounds[currentBackground];
            innerContainer.style.backgroundColor = 'transparent'; 
        }
        innerContainer.style.backgroundSize = 'cover'; 
    };

    document.getElementById('prev-button').addEventListener('click', function() {
        if (currentBackground > 0) {
            currentBackground--;
        } else {
            currentBackground = backgrounds.length - 1;
        }
        setInnerBackground();
    });

    document.getElementById('next-button').addEventListener('click', function() {
        if (currentBackground < backgrounds.length - 1) {
            currentBackground++;
        } else {
            currentBackground = 0;
        }
        setInnerBackground();
    });

    setInnerBackground();
});


window.addEventListener('resize', function() {
    const animalImages = document.querySelectorAll('.animal-img');
    animalImages.forEach(img => {
        const newSize = window.innerWidth * 0.1;  
        img.style.width = `${newSize}px`;
        img.style.height = 'auto';  
    });
});

/**
 * Julian's Raw Paws - Dashboard Interactivity JS
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Sidebar Toggle for Mobile Viewports
    // ----------------------------------------------------
    const sidebarToggle = document.getElementById('sidebarToggle');
    const dashboardSidebar = document.querySelector('.dashboard-sidebar');
    
    if (sidebarToggle && dashboardSidebar) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            dashboardSidebar.classList.toggle('show-mobile-sidebar');
        });
        
        // Hide sidebar when clicking outside of it on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 992 && 
                !dashboardSidebar.contains(e.target) && 
                e.target !== sidebarToggle) {
                dashboardSidebar.classList.remove('show-mobile-sidebar');
            }
        });
    }

    // Add mobile sidebar CSS toggle rules on the fly to avoid separate css classes conflicts
    const style = document.createElement('style');
    style.innerHTML = `
        @media (max-width: 991.98px) {
            .dashboard-sidebar {
                position: fixed;
                top: 0;
                bottom: 0;
                left: -280px;
                width: 280px;
                height: 100vh;
                box-shadow: 5px 0 15px rgba(0,0,0,0.1);
            }
            html[dir="rtl"] .dashboard-sidebar {
                left: auto;
                right: -280px;
                box-shadow: -5px 0 15px rgba(0,0,0,0.1);
            }
            .dashboard-sidebar.show-mobile-sidebar {
                left: 0;
            }
            html[dir="rtl"] .dashboard-sidebar.show-mobile-sidebar {
                right: 0;
                left: auto;
            }
        }
    `;
    document.head.appendChild(style);

    // ----------------------------------------------------
    // 2. Tab Section Switching
    // ----------------------------------------------------
    const menuItems = document.querySelectorAll('.sidebar-menu-item');
    const contentSections = document.querySelectorAll('.dashboard-content-section');

    menuItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (!href || !href.startsWith('#')) {
                    return; // Allow default navigation for standard page links like logout
                }
                
                e.preventDefault();
                
                // Get target ID from href (e.g. #analytics)
                const targetId = href.substring(1);
                
                // Update active state in sidebar
                menuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                
                // Show matching section, hide others
                contentSections.forEach(section => {
                    if (section.id === targetId) {
                        section.classList.remove('d-none');
                    } else {
                        section.classList.add('d-none');
                    }
                });

                // Hide sidebar on mobile after clicking
                if (window.innerWidth < 992 && dashboardSidebar) {
                    dashboardSidebar.classList.remove('show-mobile-sidebar');
                }
            });
        }
    });

    // ----------------------------------------------------
    // 3. Analytics Chart.js Initialization
    // ----------------------------------------------------
    const salesCtx = document.getElementById('salesChart');
    const recipeCtx = document.getElementById('recipeChart');

    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                datasets: [{
                    label: 'Subscriptions Active',
                    data: [15, 28, 45, 62, 85, 110, 145, 192],
                    borderColor: '#E65F2C',
                    backgroundColor: 'rgba(230, 95, 44, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            font: {
                                family: 'Outfit'
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'Outfit'
                            }
                        }
                    }
                }
            }
        });
    }

    if (recipeCtx) {
        new Chart(recipeCtx, {
            type: 'doughnut',
            data: {
                labels: ['Premium Beef', 'Ancestral Chicken', 'Wild Turkey', 'Vibrant Green Veggies'],
                datasets: [{
                    data: [45, 30, 15, 10],
                    backgroundColor: [
                        '#2A4B35',
                        '#E65F2C',
                        '#F1C40F',
                        '#2ECC71'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'Outfit',
                                size: 12
                            },
                            boxWidth: 12
                        }
                    }
                }
            }
        });
    }
});

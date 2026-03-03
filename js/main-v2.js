/* ============================================================
   IIPS Prototype — v2 JavaScript Additions
   Loaded AFTER main.js — extends existing functionality
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- Sidebar Collapse: Persist state in localStorage ---
  (function restoreSidebarState() {
    try {
      if (localStorage.getItem('iips-sidebar-collapsed') === '1') {
        var sidebar = document.querySelector('.sidebar');
        var main = document.querySelector('.app-main');
        if (sidebar) sidebar.classList.add('collapsed');
        if (main) main.classList.add('sidebar-collapsed');
      }
    } catch(e) {}
  })();

  // Override toggleSidebar to persist state
  var originalToggle = window.toggleSidebar;
  window.toggleSidebar = function () {
    if (originalToggle) originalToggle();
    try {
      var sidebar = document.querySelector('.sidebar');
      localStorage.setItem('iips-sidebar-collapsed', sidebar && sidebar.classList.contains('collapsed') ? '1' : '0');
    } catch(e) {}
  };

  // --- Ctrl+K Global Search Shortcut ---
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      var searchInput = document.querySelector('.topbar__search-input');
      if (searchInput) searchInput.focus();
    }
  });

  // --- Notification Dropdown Toggle ---
  (function initNotifDropdown() {
    var notifBtn = document.querySelector('.topbar__notif-toggle');
    var notifDropdown = document.querySelector('.topbar__notif-dropdown');
    if (notifBtn && notifDropdown) {
      notifBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        notifDropdown.classList.toggle('active');
        var userDropdown = document.querySelector('.topbar__user-dropdown');
        if (userDropdown) userDropdown.classList.remove('active');
      });
    }
  })();

  // --- User Menu Dropdown Toggle ---
  (function initUserDropdown() {
    var userBtn = document.querySelector('.topbar__user');
    var userDropdown = document.querySelector('.topbar__user-dropdown');
    if (userBtn && userDropdown) {
      userBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdown.classList.toggle('active');
        var notifDropdown = document.querySelector('.topbar__notif-dropdown');
        if (notifDropdown) notifDropdown.classList.remove('active');
      });
    }
  })();

  // Close v2 dropdowns on outside click
  document.addEventListener('click', function() {
    var notifDropdown = document.querySelector('.topbar__notif-dropdown');
    var userDropdown = document.querySelector('.topbar__user-dropdown');
    if (notifDropdown) notifDropdown.classList.remove('active');
    if (userDropdown) userDropdown.classList.remove('active');
  });

});

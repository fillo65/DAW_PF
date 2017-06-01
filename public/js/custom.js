$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('#basic-table').DataTable({
    lengthChange: false,
    bFilter: false, bInfo: false,
    stateSave: true,
    stateDuration:-1
  });
});

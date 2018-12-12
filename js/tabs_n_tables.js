// INFO: GENERATES BUTTONS (a-TAG), TABS (div-TAG) AND TABLES
// IS CALLED FROM 'page_loader.js'

function generateTabsNTables(n_tabs, n_tables, n_cols, n_rows) {

  var stuff = ''; /* INFO: ACCUMULATES THE FINAL STRING TO RETURN */


  // INFO: GENERATES THE BUTTONS TO TOGGLE BETWEEN TABS
  for (var btn=0; btn<n_tabs; btn++) {

    stuff += '<a class="tnt_btn b_'+btn+'" tnt_btn="'+btn+'"></a>'

  }


  // INFO: GENERATES DIVS CONTAINING THE TABLES OF CHOSEN SIZE
  for (var tab=0; tab<n_tabs; tab++) {

    stuff += '<div class="tnt_tab d_'+tab+'" tnt_tab="'+tab+'">';

    for (var table=0; table<n_tables; table++) {

      stuff += '<table class="tnt_table t_'+table+'" tnt_table="'+table+'">';

      for (var row=0; row<n_rows; row++) {

        stuff += '<tr class="tnt_row r_'+row+'" tnt_row="'+row+'">';

        for (var col=0; col<n_cols; col++) {

          stuff += '<td class="tnt_col c_'+col+'" tnt_col="'+col+'"></td>';

        }

        stuff += '</tr>';

      }

    stuff += '</table>';

    }

  stuff += '</div>';

  }

  return stuff;

}

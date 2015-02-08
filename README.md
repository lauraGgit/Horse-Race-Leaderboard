## Horse Race Google Doc Driven Leaderboard

This Bootstrap and AJAX/jQuery based table that updates from timed calls to a Google spreadsheet that is driven by a form. This assumes a LAMP or WAMP stack on your sever.

See and example at http://lgerhardt.com/leaderboard

## Form Details
The following columns are needed for the Google Form.

<table>
    <tr>
        <td>Timestamp</td>
        <td>Your Name</td>
        <td>The winning horse</td>
        <td>Will you be playing for money?</td>
        <td>What is your bet amount?</td>
    </tr>
</table>

Publish the Responses spreadsheet.
	File > Publish to the web...

##Setup
1. Replace line 5 of main.js with your spreadsheet key.
2. Update the horse list on line 17 with your contenders.
3. Play away!

##Odds calculations
The odds calculations can be changed on line 65. The odds are currently rounded to the closest whole number on line 75.


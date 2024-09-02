#!/bin/bash

# Function to handle the user's choice
function handle_choice() {
    if [[ "$choice" == "1" ]]; then
        echo " "
        echo " "
        echo "  ************************************"
        echo "  Render specification"
        echo "  ************************************"
        echo " "
        echo " "
        show_progress
        do_render
    elif [[ "$choice" == "2" ]]; then
        echo " "
        echo " "
        echo "  ************************************"
        echo "  Export to PDF"
        echo "  ************************************"
        echo " "
        echo " "
        show_progress
        do_topdf
    elif [[ "$choice" == "3" ]]; then
        echo " "
        echo " "
        echo "  ************************************"
        echo "  Look up xrefs"
        echo "  ************************************"
        echo " "
        echo " "
        show_progress
        do_xrefs
    elif [[ "$choice" == "4" ]]; then
        echo " "
        echo " "
        echo "  ************************************"
        echo "  Validate config file"
        echo "  ************************************"
        echo " "
        echo " "
        show_progress
        do_validatespec
    elif [[ "$choice" == "5" ]]; then
        echo " "
        echo " "
        echo "  ************************************"
        echo "  Add new terms"
        echo "  ************************************"
        echo " "
        echo " "
        show_progress
        do_addterms
    elif [[ "$choice" == "6" ]]; then
        echo " "
        echo " "
        echo "  ************************************"
        echo "  Open documentation website"
        echo "  ************************************"
        echo " "
        echo " "
        show_progress
        do_help


    # # Example of confirmation prompt
    # elif [[ "$choice" == "4" ]]; then
    #     read -n 1 -r -p "  Are you sure? (y/N) " confirm
    #         echo  # Empty line below the prompt
    #         if [[ "$confirm" == [yY] ]]; then
    #             echo " "
    #             echo " "
    #             echo "  ************************************"
    #             echo "  The script will now …."
    #             echo "  ************************************"
    #             echo " "
    #             echo " "
    #             show_progress
    #             do_something
    #         else
    #             echo "Cancelled."
    #         fi
    else
        clear
        echo " "
        echo " "
        echo "  ************************************"
        echo "  Goodbye! You chose to exit."
        echo "  ************************************"
        echo " "
        echo " "
    fi

    echo "\n\n\n  Type 'npm run menu' to return to the main menu."
}

# Function to display the introduction text
function display_intro() {
    clear
    echo " "
    echo "  ,---.                  .   .        --.--"
    echo "  \`---.,---.,---.,---.   |   |,---.     |  "
    echo "      ||   ||---'|    ---|   ||   |---  |  "
    echo "  \`---'|---'\`---'\`---'   \`---'|---'     \`  "
    echo "       |                      |            "
    echo " "
    echo " "
    echo "  Please choose one of the following options:"
    echo " "
    echo "   [1] Render specification"
    echo "   [2] Export to PDF"
    echo "   [3] Look up xrefs"
    echo "   [4] Validate config file"
    echo "   [5] Add new terms"
    echo "   [6] Open documentation website"
    echo "   [Q] Quit"
    echo " "
    echo " "

}

# Function to prompt the user for input
function prompt_input() {
    read -n 1 -r -p "  Enter your choice (1/2/3/4/5/Q)? " choice
    echo  # Empty line below the prompt
    echo  # Empty line below the prompt
}

function do_render() {
    clear
    npm run render
}

function do_topdf() {
    clear
    npm run topdf
}

function do_xrefs() {
    clear
    npm run xrefs
}

function do_validatespec() {
    clear
    npm run validatespec
}

function do_addterms() {
    clear
    npm run addterms
}

function do_help() {
    clear
    echo "\n\n\n   You will be redirected to the documentation website\n\n   (https://blockchainbird.github.io/spec-up-t-website/)."
    sleep 2
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "https://blockchainbird.github.io/spec-up-t-website/"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open "https://blockchainbird.github.io/spec-up-t-website/"
    elif [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        start "https://blockchainbird.github.io/spec-up-t-website/"
    else
        echo "Unsupported OS."
    fi
    # ;;
}


# Function to show the progress of the scraping process
function show_progress() {
    for i in {1..3}
    do
      printf "."
      sleep 0.2
    done
}

# Main script starts here
display_intro
prompt_input
handle_choice

# End of script

